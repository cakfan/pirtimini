"use server";

import { getMe } from "./me";

export async function checkUserPersmission(roles: string[]): Promise<boolean> {
  try {
    const me = await getMe();

    if (!me) return false;

    return roles.includes(me.role);
  } catch (error) {
    console.error("CHECK_USER_PERMISSION:", error);
    return false;
  }
}
