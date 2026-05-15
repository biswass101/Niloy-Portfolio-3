import { defaultPortfolioContent } from "@/data/defaultCmsContent";
import { connectDb } from "@/lib/db";
import { AboutContentModel } from "@/models/AboutContent";
import { CertificationsContentModel } from "@/models/CertificationsContent";
import { ContactContentModel } from "@/models/ContactContent";
import { EducationContentModel } from "@/models/EducationContent";
import { ExperiencesContentModel } from "@/models/ExperiencesContent";
import { HeroContentModel } from "@/models/HeroContent";
import { ProjectsContentModel } from "@/models/ProjectsContent";
import { SkillCategoriesContentModel } from "@/models/SkillCategoriesContent";
import type { PortfolioContent } from "@/types/cms";

const CMS_DOC_KEY = "main";

const cloneFallback = () => JSON.parse(JSON.stringify(defaultPortfolioContent)) as PortfolioContent;

const upsertSectionDocs = async (content: PortfolioContent, updatedBy: string) => {
  await Promise.all([
    HeroContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.hero, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    AboutContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.about, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    EducationContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.education, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    ContactContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.contact, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    ProjectsContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.projects, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    ExperiencesContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.experiences, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    SkillCategoriesContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.skillCategories, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    CertificationsContentModel.findOneAndUpdate(
      { key: CMS_DOC_KEY },
      { key: CMS_DOC_KEY, content: content.certifications, updatedBy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
  ]);
};

const readSectionContent = async () => {
  const [
    heroDoc,
    aboutDoc,
    educationDoc,
    contactDoc,
    projectsDoc,
    experiencesDoc,
    skillCategoriesDoc,
    certificationsDoc,
  ] = await Promise.all([
    HeroContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    AboutContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    EducationContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    ContactContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    ProjectsContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    ExperiencesContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    SkillCategoriesContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
    CertificationsContentModel.findOne({ key: CMS_DOC_KEY }).lean(),
  ]);

  const hasAnySectionDoc = [
    heroDoc,
    aboutDoc,
    educationDoc,
    contactDoc,
    projectsDoc,
    experiencesDoc,
    skillCategoriesDoc,
    certificationsDoc,
  ].some(Boolean);

  return {
    hasAnySectionDoc,
    content: {
      hero: (heroDoc?.content ?? cloneFallback().hero) as PortfolioContent["hero"],
      about: (aboutDoc?.content ?? cloneFallback().about) as PortfolioContent["about"],
      education: (educationDoc?.content ?? cloneFallback().education) as PortfolioContent["education"],
      contact: (contactDoc?.content ?? cloneFallback().contact) as PortfolioContent["contact"],
      projects: (projectsDoc?.content ?? cloneFallback().projects) as PortfolioContent["projects"],
      experiences: (experiencesDoc?.content ?? cloneFallback().experiences) as PortfolioContent["experiences"],
      skillCategories: (skillCategoriesDoc?.content ??
        cloneFallback().skillCategories) as PortfolioContent["skillCategories"],
      certifications: (certificationsDoc?.content ??
        cloneFallback().certifications) as PortfolioContent["certifications"],
    },
  };
};

const migrateLegacyDocIfNeeded = async () => {
  const sectionState = await readSectionContent();
  if (sectionState.hasAnySectionDoc) {
    return sectionState.content;
  }

  const connection = await connectDb();
  const db = connection.connection.db;
  if (!db) {
    return sectionState.content;
  }

  const legacyDoc = await db.collection("portfoliocontents").findOne({ key: CMS_DOC_KEY });

  if (!legacyDoc?.content) {
    return sectionState.content;
  }

  const legacyContent = legacyDoc.content as PortfolioContent;
  await upsertSectionDocs(legacyContent, legacyDoc.updatedBy || "legacy-migration");

  const migratedState = await readSectionContent();
  return migratedState.content;
};

export const getPublicPortfolioContent = async () => {
  try {
    await connectDb();
    return await migrateLegacyDocIfNeeded();
  } catch {
    return cloneFallback();
  }
};

export const getAdminPortfolioContent = async () => {
  await connectDb();
  return migrateLegacyDocIfNeeded();
};

export const savePortfolioContent = async (content: PortfolioContent, updatedBy: string) => {
  await connectDb();
  await upsertSectionDocs(content, updatedBy);
  return content;
};
