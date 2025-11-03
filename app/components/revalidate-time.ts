"use server";

import { updateTag } from "next/cache";

export const revalidateTime = async (tag: string) => {
  console.log(`Updating tag ${tag}`);
  updateTag(tag);
};
