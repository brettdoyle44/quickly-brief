import Link from "next/link";
import { useRouter } from "next/router";
import UpgradeButton from "../../../client/components/UpgradeButton";
import { useGetProjectQuery } from "../../../client/graphql/getProject.generated";
import NavBar from "../../../client/components/Navbar";
import DashboardWrapper from "../../../client/components/DashboardWrapper";

function Project() {
  const router = useRouter();
  const { slug } = router.query;
  const [{ data, fetching, error }] = useGetProjectQuery({
    variables: {
      slug: String(slug),
    },
  });

  if (fetching) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (!data?.project || typeof slug !== "string") return <p>Not found.</p>;

  const { project } = data;

  return (
    <>
      <NavBar slug={slug} />
      <DashboardWrapper title="Dashboard">
        <div className="px-4 py-8 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
      </DashboardWrapper>
      {/* {!project.paidPlan && <UpgradeButton projectId={project.id} />}
      <Link href={`/app/${project.slug}/settings`}>Settings</Link> */}
    </>
  );
}

export default Project;
