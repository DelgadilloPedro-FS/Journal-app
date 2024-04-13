import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData,Form,redirect,useNavigation, useSubmit,} from "react-router-dom";
import { getJournals, createJournal } from "../journals";

export async function action() {
    const journal = await createJournal();
    return redirect(`/journals/${journal.id}/edit`);
  }
  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const journals = await getJournals(q);
    return { journals, q };
  }

export default function Root() {
  const { journals, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router journals</h1>
        <div>
        <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search journals"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {journals.length ? (
            <ul>
              {journals.map((journal) => (
                
                <li key={journal.id}>
                  <NavLink
                    to={`journals/${journal.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {journal.name ? (
                      <>
                        {journal.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {journal.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No journals</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }
>
        <Outlet />
      </div>
    </>
  );
}
