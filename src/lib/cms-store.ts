import { defaultPortfolioContent } from "@/data/defaultCmsContent";
import { connectDb } from "@/lib/db";
import { PortfolioContentModel } from "@/models/PortfolioContent";
import type { PortfolioContent } from "@/types/cms";

const CMS_DOC_KEY = "main";

const cloneFallback = () => JSON.parse(JSON.stringify(defaultPortfolioContent)) as PortfolioContent;

export const getPublicPortfolioContent = async () => {
  try {
    await connectDb();
    const doc = await PortfolioContentModel.findOne({ key: CMS_DOC_KEY }).lean();

    if (!doc || !doc.content) {
      return cloneFallback();
    }

    return doc.content as PortfolioContent;
  } catch {
    return cloneFallback();
  }
};

export const getAdminPortfolioContent = async () => {
  await connectDb();
  const doc = await PortfolioContentModel.findOne({ key: CMS_DOC_KEY }).lean();

  if (!doc || !doc.content) {
    return cloneFallback();
  }

  return doc.content as PortfolioContent;
};

export const savePortfolioContent = async (content: PortfolioContent, updatedBy: string) => {
  await connectDb();

  const doc = await PortfolioContentModel.findOneAndUpdate(
    { key: CMS_DOC_KEY },
    {
      key: CMS_DOC_KEY,
      content,
      updatedBy,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  ).lean();

  return doc?.content as PortfolioContent;
};
