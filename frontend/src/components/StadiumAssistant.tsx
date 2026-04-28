import { useState } from "react";

type Match = {
  id?: string | number;
  name?: string;
  title?: string;
  team1?: string;
  team2?: string;
  venue?: string;
  status?: string;
  date?: string;
  time?: string;
};

type Props = {
  match?: Match;
};

function getPitchReport(venue: string) {
  const v = venue.toLowerCase();

  if (v.includes("chennai") || v.includes("chepauk")) {
    return "Spin-friendly pitch. Batters need to settle first. Spinners can get strong help in middle overs.";
  }

  if (v.includes("mumbai") || v.includes("wankhede")) {
    return "Good batting surface with bounce. Pacers may get swing early, but chasing is often easier because of dew.";
  }

  if (v.includes("bengaluru") || v.includes("chinnaswamy")) {
    return "High-scoring ground. Short boundaries help batters. Bowlers need variations and yorkers.";
  }

  if (v.includes("kolkata") || v.includes("eden")) {
    return "Balanced surface. Batting gets easier later. Spinners and cutters can be useful.";
  }

  if (v.includes("hyderabad")) {
    return "Usually good for batting, but slower balls and spin can work as match goes deeper.";
  }

  if (v.includes("delhi")) {
    return "Can be slightly slow. Spinners may get grip. A score around 160-180 can be competitive depending on pitch.";
  }

  if (v.includes("ahmedabad") || v.includes("narendra modi")) {
    return "Big ground with balanced pitch. Pacers get bounce, batters get value if they time well.";
  }

  return "Pitch report depends on venue. Usually, dry pitch helps spinners, green pitch helps pacers, and flat pitch helps batting.";
}

function getWeatherNote(venue: string) {
  const v = venue.toLowerCase();

  if (v.includes("mumbai") || v.includes("chennai") || v.includes("hyderabad")) {
    return "Warm conditions expected. Dew may become important in night matches, so chasing can get easier.";
  }

  if (v.includes("bengaluru")) {
    return "Weather can change quickly. Rain interruptions are possible sometimes, so teams may prefer chasing.";
  }

  if (v.includes("delhi") || v.includes("ahmedabad")) {
    return "Hot and dry conditions can affect stamina. Spinners may get more help if surface becomes dry.";
  }

  return "For exact live weather, connect a weather API later. Current smart estimate is based on venue conditions.";
}

function getTossSuggestion(venue: string) {
  const v = venue.toLowerCase();

  if (
    v.includes("mumbai") ||
    v.includes("wankhede") ||
    v.includes("bengaluru") ||
    v.includes("chinnaswamy")
  ) {
    return "Winning the toss team may prefer bowling first because chasing can be easier.";
  }

  if (v.includes("chennai") || v.includes("chepauk")) {
    return "Winning the toss team may prefer batting first if pitch looks dry, because spin can increase later.";
  }

  return "Toss decision depends on pitch, dew, weather, and team strength.";
}

export default function StadiumAssistant({ match }: Props) {
  const [open, setOpen] = useState(false);

  const matchName =
    match?.name ||
    match?.title ||
    `${match?.team1 || "Team A"} vs ${match?.team2 || "Team B"}`;

  const venue = match?.venue || "Venue not available";

  const pitchReport = getPitchReport(venue);
  const weatherNote = getWeatherNote(venue);
  const tossSuggestion = getTossSuggestion(venue);

  return (
    <div className="rounded-3xl bg-zinc-900 p-4 shadow-lg text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-pink-400 mb-1">AI Stadium Assistant</p>
          <h2 className="text-lg font-bold">{matchName}</h2>
          <p className="text-sm text-zinc-400">{venue}</p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-4 py-2 text-sm font-semibold"
        >
          {open ? "Hide" : "Analyze"}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl bg-[#070b16] p-3">
            <p className="text-sm font-semibold text-white">🏟️ Stadium Report</p>
            <p className="text-sm text-zinc-400 mt-1">
              This report is generated from selected match venue and cricket conditions.
            </p>
          </div>

          <div className="rounded-2xl bg-[#070b16] p-3">
            <p className="text-sm font-semibold text-white">🌱 Pitch Report</p>
            <p className="text-sm text-zinc-400 mt-1">{pitchReport}</p>
          </div>

          <div className="rounded-2xl bg-[#070b16] p-3">
            <p className="text-sm font-semibold text-white">🌦️ Weather Forecast</p>
            <p className="text-sm text-zinc-400 mt-1">{weatherNote}</p>
          </div>

          <div className="rounded-2xl bg-[#070b16] p-3">
            <p className="text-sm font-semibold text-white">🪙 Toss Suggestion</p>
            <p className="text-sm text-zinc-400 mt-1">{tossSuggestion}</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-orange-500/30 p-3">
            <p className="text-sm font-semibold text-white">🤖 AI Insight</p>
            <p className="text-sm text-zinc-300 mt-1">
              For best accuracy, connect live weather API + match venue API later.
              Right now, Cucuber AI gives smart cricket-based venue analysis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}