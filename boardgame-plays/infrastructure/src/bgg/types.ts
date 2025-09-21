import bgg from "bgg-sdk";

export type BggThing = Awaited<ReturnType<typeof bgg.thing>>["items"][number];
