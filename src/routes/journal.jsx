import { useLoaderData, Form, useFetcher } from "react-router-dom";
import { getJournal, updateJournal } from "../journals";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateJournal(params.journalId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
    const journal = await getJournal(params.journalId);
    if (!journal) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { journal };
}

export default function journal() {
  const { journal } = useLoaderData();

  return (
    <div id="journal">

      <div>
        <h1>
          {journal.name ? (
            <>
              {journal.author_First_Name} {journal.author_Last_Name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite journal={journal} />
        </h1>

        {journal.entry && <p>{journal.entry}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ journal }) {
  const fetcher = useFetcher();

  let favorite = journal.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
