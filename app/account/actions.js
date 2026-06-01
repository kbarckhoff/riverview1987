"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

import { query } from "@/lib/db";
import site from "@/lib/site-config";
import { checkAccessCode } from "@/lib/access";
import { hashPassword, verifyPassword, setMemberSession, clearMemberSession } from "@/lib/member-auth";

const adminEmails = () => (site.adminEmails || []).map((e) => e.toLowerCase());

export async function registerAccount(formData) {
  const name = (formData.get("name") || "").toString().trim().slice(0, 120);
  const email = (formData.get("email") || "").toString().trim().toLowerCase().slice(0, 160);
  const pw = (formData.get("password") || "").toString();
  const code = (formData.get("code") || "").toString();

  if (!checkAccessCode(code)) redirect("/account/register?err=code");
  if (!name || !email.includes("@") || pw.length < 6) redirect("/account/register?err=fields");

  const ex = await query("SELECT id FROM members WHERE email=$1", [email]);
  if (ex.rows.length) redirect("/account/register?err=exists");

  const is_admin = adminEmails().includes(email);
  const { rows } = await query(
    "INSERT INTO members (email, password_hash, name, is_admin) VALUES ($1,$2,$3,$4) RETURNING id",
    [email, hashPassword(pw), name, is_admin]
  );
  setMemberSession(rows[0].id);
  redirect("/classmates");
}

export async function loginAccount(formData) {
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const pw = (formData.get("password") || "").toString();
  const { rows } = await query("SELECT id, password_hash FROM members WHERE email=$1", [email]);
  if (!rows.length || !verifyPassword(pw, rows[0].password_hash)) redirect("/account/login?err=1");
  setMemberSession(rows[0].id);
  redirect("/classmates");
}

export async function logoutAccount() {
  clearMemberSession();
  redirect("/");
}


export async function requestPasswordReset(formData) {
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  if (email.includes("@")) {
    const { rows } = await query("SELECT id FROM members WHERE email=$1", [email]);
    if (rows.length) {
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      await query("INSERT INTO password_resets (token,member_id,expires_at) VALUES ($1,$2,$3)", [token, rows[0].id, expires]);
      const base = process.env.SITE_URL || "https://riverview1987.com";
      const link = `${base}/account/reset?token=${token}`;
      await sendEmail({
        to: email,
        subject: "Reset your Riverview Reunion password",
        html: `<p>We received a request to reset your password for the Riverview Class of 1987 reunion site.</p><p><a href="${link}">Click here to set a new password</a> (this link expires in 1 hour).</p><p>If you didn't request this, you can safely ignore this email.</p>`,
      });
    }
  }
  redirect("/account/forgot?sent=1");
}

export async function performPasswordReset(formData) {
  const token = (formData.get("token") || "").toString();
  const pw = (formData.get("password") || "").toString();
  if (!token) redirect("/account/reset?err=expired");
  if (pw.length < 6) redirect(`/account/reset?token=${token}&err=fields`);
  const { rows } = await query("SELECT member_id, expires_at FROM password_resets WHERE token=$1", [token]);
  if (!rows.length || new Date(rows[0].expires_at) < new Date()) redirect("/account/reset?err=expired");
  await query("UPDATE members SET password_hash=$1 WHERE id=$2", [hashPassword(pw), rows[0].member_id]);
  await query("DELETE FROM password_resets WHERE token=$1", [token]);
  setMemberSession(rows[0].member_id);
  redirect("/classmates");
}
