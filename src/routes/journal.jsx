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
    <div
      className="bg-white shadow-md rounded overflow-hidden mb-4"
    >
      <div className="flex justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">
            {journal.name ? (
              <>
                {journal.author_First_Name} {journal.author_Last_Name}
              </>
            ) : (
              <i>No Name</i>
            )}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(journal.createdAt).toLocaleString()}
          </span>
        </div>
        <Favorite journal={journal} />
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-700 mb-4">{journal.entry}</p>
        <div className="flex justify-end">
          <Form action="edit" className="mr-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
            className="flex items-center"
          >
            <button
              type="submit"
              className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
            >
              Delete
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l%-4 4-4-4 1-1-4-4-4 4-1 1 4 4 4-4z"
              />
            </svg>
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
