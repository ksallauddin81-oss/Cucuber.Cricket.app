export function getTeamFlag(team: string) {
  const flags: Record<string, string> = {
    India: "🇮🇳",
    Australia: "🇦🇺",
    England: "🏴",
    Pakistan: "🇵🇰",
    Nepal: "🇳🇵",
    "United Arab Emirates": "🇦🇪",
    "United States of America": "🇺🇸",
    Italy: "🇮🇹",
    Rwanda: "🇷🇼",
    Vanuatu: "🇻🇺",
  };

  return flags[team] || "🏏";
}

export function getTeamLogo(team: string) {
  // simple colored circle with initials
  const initials = team
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials;
}