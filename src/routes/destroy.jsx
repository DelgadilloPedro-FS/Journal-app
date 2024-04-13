import { redirect } from "react-router-dom";
import { deleteJournal } from "../journals";

export async function action({ params }) {
  await deleteJournal(params.journalId);
  return redirect("/");
}