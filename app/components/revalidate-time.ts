"use server";

import { updateTag } from "next/cache";

export const revalidateTime = async (tag: string) => {
  updateTag(tag);
};
