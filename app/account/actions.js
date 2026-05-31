"use server";

import { redirect } from "next/navigation";
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
