import requests
from app.config.settings import settings


def _fetch_current_matches():
    url = f"{settings.CRICKET_BASE_URL}/currentMatches"
    params = {
        "apikey": settings.CRICKET_API_KEY,
        "offset": 0,
    }

    response = requests.get(url, params=params, timeout=20)
    response.raise_for_status()

    data = response.json()

    if not isinstance(data, dict):
        raise Exception("Invalid API response format")

    if "data" not in data:
        raise Exception(f"API response missing 'data': {data}")

    return data["data"]


def get_live_matches():
    api_matches = _fetch_current_matches()
    matches = []

    for match in api_matches:
        status = str(match.get("status", ""))
        if "live" not in status.lower():
            continue

        teams = match.get("teams") or []
        score = match.get("score") or []

        team1 = teams[0] if len(teams) > 0 else "Team 1"
        team2 = teams[1] if len(teams) > 1 else "Team 2"

        team1_score = "Yet to bat"
        team2_score = "Yet to bat"

        if len(score) > 0 and isinstance(score[0], dict):
            team1_score = f"{score[0].get('r', 0)}/{score[0].get('w', 0)} ({score[0].get('o', 0)} ov)"

        if len(score) > 1 and isinstance(score[1], dict):
            team2_score = f"{score[1].get('r', 0)}/{score[1].get('w', 0)} ({score[1].get('o', 0)} ov)"

        matches.append({
            "match_id": match.get("id"),
            "team1": team1,
            "team2": team2,
            "team1_score": team1_score,
            "team2_score": team2_score,
            "status": status or "Live",
        })

    return matches


def get_upcoming_matches():
    api_matches = _fetch_current_matches()
    matches = []

    for match in api_matches:
        status = str(match.get("status", ""))
        teams = match.get("teams") or []

        if len(teams) < 2:
            continue

        if (
            "not started" in status.lower()
            or "match not started" in status.lower()
            or "starts" in status.lower()
        ):
            matches.append({
                "match_id": match.get("id"),
                "team1": teams[0],
                "team2": teams[1],
                "status": status or "Match not started",
            })

    return matches