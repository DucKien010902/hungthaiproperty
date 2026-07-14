import { notFound } from "next/navigation";

import { getAllProjects, getProjectById } from "../lib/content-api";
import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeContact } from "../sections/home/home-contact";
import { ProjectFactsSection } from "../sections/projects/project-facts-section";
import { ProjectsCatalogSection } from "../sections/projects/projects-catalog-section";
import { ProjectSpotlightSection } from "../sections/projects/project-spotlight-section";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";
import { ServerErrorSection } from "../sections/shared/server-error-section";

type FeaturedProjectsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    project?: string | string[];
  }>;
};

export default async function FeaturedProjectsPage({
  searchParams,
}: FeaturedProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const projectId = Array.isArray(resolvedSearchParams.project)
    ? resolvedSearchParams.project[0]
    : resolvedSearchParams.project;
  const pageValue = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const currentPage = pageValue ? Number(pageValue) : 1;

  try {
    const project = projectId ? await getProjectById(projectId) : null;
    const projects = project ? [] : await getAllProjects();

    if (projectId && !project) {
      notFound();
    }

    return (
      <>
        <main>
          <PageBanner title={project ? project.title : "DỰ ÁN"} />
          {project ? (
            <>
              <ProjectSpotlightSection project={project} />
              <ProjectFactsSection project={project} />
            </>
          ) : (
            <ProjectsCatalogSection currentPage={currentPage} projects={projects} />
          )}
          <HomeContact />
        </main>
        <SiteFooter />
        <FloatingContactButtons />
      </>
    );
  } catch {
    return (
      <>
        <main>
          <PageBanner title="DỰ ÁN" />
          <ServerErrorSection message="Hệ thống đang gặp lỗi máy chủ khi tải dữ liệu dự án. Vui lòng thử lại sau ít phút." />
          <HomeContact />
        </main>
        <SiteFooter />
        <FloatingContactButtons />
      </>
    );
  }
}
