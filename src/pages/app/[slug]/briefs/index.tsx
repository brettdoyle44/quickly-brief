import Link from "next/link";
import { useRouter } from "next/router";
import UpgradeButton from "../../../../client/components/UpgradeButton";
import { useGetProjectQuery } from "../../../../client/graphql/getProject.generated";
import NavBar from "../../../../client/components/Navbar";
import DashboardWrapper from "../../../../client/components/DashboardWrapper";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

function Briefs() {
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
      <DashboardWrapper title="Briefs">
        <ul role="list" className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-4">
              Something
            </li>
          ))}
        </ul>
      </DashboardWrapper>
    </>
  );
}

export default Briefs;
