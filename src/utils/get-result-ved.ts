export const getResultVED = (game: string, teamName: string) => {
  const regex = /(.+?) (\d+) X (\d+) (.+)/;
  const match = game.match(regex);

  let teamHome = '';
  let goalsHome = '';
  let goalsAway = '';
  let teamAway = '';

  if (match) {
    teamHome = match[1];
    goalsHome = match[2];
    goalsAway = match[3];
    teamAway = match[4];
  }

  if (teamHome.includes(teamName)) {
    if (goalsHome > goalsAway) {
      return 'V';
    }
    if (goalsHome === goalsAway) {
      return 'E';
    }
    if (goalsHome < goalsAway) {
      return 'D';
    }
  }

  if (teamAway.includes(teamName)) {
    if (goalsAway > goalsHome) {
      return 'V';
    }
    if (goalsAway === goalsHome) {
      return 'E';
    }
    if (goalsAway < goalsHome) {
      return 'D';
    }
  }
};
