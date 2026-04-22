import requests
from app.config.settings import settings

API_KEY = settings.CRICKET_API_KEY
BASE_URL = settings.CRICKET_BASE_URL


def _get(endpoint: str):
    try:
        response = requests.get(
            f"{BASE_URL}/{endpoint}",
            params={"apikey": API_KEY},
            timeout=10,
        )

        response.raise_for_status()
        data = response.json()

        # CricAPI usually returns matches inside "data"
        return data.get("data", [])

    except Exception as e:
        print("CRICKET API ERROR:", e)
        return []


def get_live_matches():
    matches = _get("currentMatches")

    live_matches = []

    for match in matches:
        if not match.get("matchEnded", False):
            live_matches.append(
                {
                    "id": match.get("id"),
                    "name": match.get("name"),
                    "status": match.get("status"),
                    "team1": match.get("teams", ["Team 1", "Team 2"])[0]
                    if len(match.get("teams", [])) > 0
                    else "Team 1",
                    "team2": match.get("teams", ["Team 1", "Team 2"])[1]
                    if len(match.get("teams", [])) > 1
                    else "Team 2",
                    "score": match.get("score", []),
                    "venue": match.get("venue"),
                    "date": match.get("date"),
                }
            )

    return live_matches


def get_recent_matches():
    matches = _get("currentMatches")

    completed_matches = []

    for match in matches:
        if match.get("matchEnded", False):
            completed_matches.append(
                {
                    "id": match.get("id"),
                    "name": match.get("name"),
                    "status": match.get("status"),
                    "team1": match.get("teams", ["Team 1", "Team 2"])[0]
                    if len(match.get("teams", [])) > 0
                    else "Team 1",
                    "team2": match.get("teams", ["Team 1", "Team 2"])[1]
                    if len(match.get("teams", [])) > 1
                    else "Team 2",
                    "score": match.get("score", []),
                    "venue": match.get("venue"),
                    "date": match.get("date"),
                }
            )

    return completed_matches


def get_upcoming_matches():
    matches = _get("currentMatches")

    upcoming_matches = []

    for match in matches:
        if not match.get("matchStarted", False):
            upcoming_matches.append(
                {
                    "id": match.get("id"),
                    "name": match.get("name"),
                    "team1": match.get("teams", ["Team 1", "Team 2"])[0]
                    if len(match.get("teams", [])) > 0
                    else "Team 1",
                    "team2": match.get("teams", ["Team 1", "Team 2"])[1]
                    if len(match.get("teams", [])) > 1
                    else "Team 2",
                    "venue": match.get("venue"),
                    "date": match.get("date"),
                }
            )

    return upcoming_matches