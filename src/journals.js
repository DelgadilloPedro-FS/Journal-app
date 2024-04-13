import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
// get journals
export async function getJournals(query) {
  await fakeNetwork(`getJournals:${query}`);
  let journals = await localforage.getItem("journals");
  if (!journals) journals = [];
  if (query) {
    journals = matchSorter(journals, query, { keys: ["first", "last"] });
  }
  return journals.sort(sortBy("last", "createdAt"));
}
// crete journals
export async function createJournal() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let journal = { id, createdAt: Date.now() };
  let journals = await getJournals();
  journals.unshift(journal);
  await set(journals);
  return journal;
}

export async function getJournal(id) {
  await fakeNetwork(`journal:${id}`);
  let journals = await localforage.getItem("journals");
  let journal = journals.find((journal) => journal.id === id);
  return journal ?? null;
}

export async function updateJournal(id, updates) {
  await fakeNetwork();
  let journals = await localforage.getItem("journals");
  let journal = journals.find((journal) => journal.id === id);
  if (!journal) throw new Error("No journal found for", id);
  Object.assign(journal, updates);
  await set(journals);
  return journal;
}

export async function deleteJournal(id) {
  let journals = await localforage.getItem("journals");
  let index = journals.findIndex((journal) => journal.id === id);
  if (index > -1) {
    journals.splice(index, 1);
    await set(journals);
    return true;
  }
  return false;
}

function set(journals) {
  return localforage.setItem("journals", journals);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
// Mock Data
const DATA = [
  {
    id: "1",
    name: "Blog - 1",
    author_First_Name: "Firs name",
    author_Last_Name: "Last name",
    entry: "an entry 2",
    createdAt: 1713000191648
  },
  {
    id: "2",
    name: "Blog - 2",
    author_First_Name: "Firs name",
    author_Last_Name: "Last name",
    entry: "an entry 3",
    createdAt: 1713000191648
  },
  {
    id: "3",
    name: "Blog - 3",
    author_First_Name: "Firs name",
    author_Last_Name: "Last name",
    entry: "an entry 4",
    createdAt: 1713000191648
  },
];
// set intial Post
set(DATA);
