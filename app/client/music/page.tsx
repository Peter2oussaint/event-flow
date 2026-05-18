export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  formatDisplayDate,
  getMusicPlanningReminderDueDate,
  getMusicPlanningReminderStatus,
} from "@/lib/utils/dates";

import { SectionPanel } from "../section-panel";

const playlistCards = [
  "Cocktail Inspiration",
  "Dinner Inspiration",
  "Dancing Inspiration",
  "Formalities",
];

type MusicStatusPanelProps = {
  eventDate?: Date | string | null;
  musicPlanningReminderSentAt?: Date | string | null;
};

function MusicStatusPanel({
  eventDate,
  musicPlanningReminderSentAt,
}: MusicStatusPanelProps) {
  const dueDate = getMusicPlanningReminderDueDate(eventDate);
  const status = getMusicPlanningReminderStatus({
    eventDate,
    musicPlanningReminderSentAt,
  });

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <article className="rounded-[1.75rem] bg-[#26a996] p-6">
        <p className="text-lg text-white/85">Event date</p>
        <p className="mt-3 text-2xl font-bold text-white">
          {formatDisplayDate(eventDate)}
        </p>
      </article>
      <article className="rounded-[1.75rem] bg-[#26a996] p-6">
        <p className="text-lg text-white/85">Music planning opens</p>
        <p className="mt-3 text-2xl font-bold text-white">
          {formatDisplayDate(dueDate)}
        </p>
      </article>
      <article className="rounded-[1.75rem] bg-[#26a996] p-6">
        <p className="text-lg text-white/85">Music planning status</p>
        <p className="mt-3 text-2xl font-bold text-white">{status}</p>
      </article>
    </div>
  );
}

function MusicPlanningTools() {
  return (
    <>
      <p className="max-w-3xl text-xl leading-relaxed text-white">
        This section will help collect inspiration for the music at your event.
        You will be able to create playlists for different parts of the day or
        import/share an existing Spotify playlist you already started.
      </p>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <article className="rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            Create Inspiration Playlist
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-lg font-medium text-white">
                Playlist name
              </span>
              <input
                type="text"
                className="mt-2 w-full rounded-2xl border border-white/30 bg-[#48897f] px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-[#f68e58]"
                placeholder="Dinner favorites"
              />
            </label>

            <label className="block">
              <span className="text-lg font-medium text-white">
                Playlist type
              </span>
              <select className="mt-2 w-full rounded-2xl border border-white/30 bg-[#48897f] px-4 py-3 text-white outline-none transition focus:border-[#f68e58]">
                <option>Cocktail</option>
                <option>Dinner</option>
                <option>Dancing</option>
                <option>Formalities</option>
                <option>General Inspiration</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            className="mt-6 rounded-full bg-[#f68e58] px-7 py-3 text-lg font-bold text-white transition hover:bg-white hover:text-[#48897f]"
          >
            Create Inspiration Playlist
          </button>
        </article>

        <article className="rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            Share Existing Spotify Playlist
          </h3>
          <label className="mt-5 block">
            <span className="text-lg font-medium text-white">
              Spotify playlist URL
            </span>
            <input
              type="url"
              className="mt-2 w-full rounded-2xl border border-white/30 bg-[#48897f] px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-[#f68e58]"
              placeholder="https://open.spotify.com/playlist/..."
            />
          </label>
          <button
            type="button"
            className="mt-6 rounded-full bg-[#f68e58] px-7 py-3 text-lg font-bold text-white transition hover:bg-white hover:text-[#48897f]"
          >
            Import Playlist
          </button>
        </article>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {playlistCards.map((playlist) => (
          <article key={playlist} className="rounded-[1.75rem] bg-[#26a996] p-5">
            <h4 className="text-xl font-bold text-white">{playlist}</h4>
            <p className="mt-3 text-lg text-white">Not created yet</p>
          </article>
        ))}
      </div>
    </>
  );
}

export default async function ClientMusicPage() {
  const testLeadId = process.env.CLIENT_PORTAL_TEST_LEAD_ID;

  if (!testLeadId) {
    return (
      <SectionPanel title="Music Planning">
        <div className="mb-8 rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            No test event connected yet
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">
            Add a temporary lead id to CLIENT_PORTAL_TEST_LEAD_ID to preview
            music planning status in the client portal.
          </p>
        </div>
        <MusicPlanningTools />
      </SectionPanel>
    );
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: testLeadId,
    },
    select: {
      eventDate: true,
      musicPlanningReminderSentAt: true,
    },
  });

  if (!lead) {
    return (
      <SectionPanel title="Music Planning">
        <div className="mb-8 rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            Test event not found
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">
            The configured test lead id does not match an existing lead.
          </p>
        </div>
        <MusicPlanningTools />
      </SectionPanel>
    );
  }

  return (
    <SectionPanel title="Music Planning">
      <MusicStatusPanel
        eventDate={lead.eventDate}
        musicPlanningReminderSentAt={lead.musicPlanningReminderSentAt}
      />
      <MusicPlanningTools />
    </SectionPanel>
  );
}
