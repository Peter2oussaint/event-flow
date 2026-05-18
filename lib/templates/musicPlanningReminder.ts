type MusicPlanningReminderEmailInput = {
  clientName: string;
  portalMusicUrl?: string;
};

export function createMusicPlanningReminderEmail({
  clientName,
  portalMusicUrl,
}: MusicPlanningReminderEmailInput) {
  const portalLine = portalMusicUrl
    ? `You can visit the Music Planning section here: ${portalMusicUrl}`
    : "You can access the Music Planning section in your client portal.";

  return {
    subject: "Music planning for your event",
    body: `Hi ${clientName},

I hope you're doing well. It is a good time to start thinking through music planning for your event.

In the client portal, you can use the Music Planning section to create inspiration playlists for different parts of the celebration, or import/share an existing Spotify playlist if you already have one started.

${portalLine}

No rush to finish everything at once. This is just a helpful place to start collecting the songs, artists, and overall feel you want for the day.

Best,
Peter`,
  };
}
