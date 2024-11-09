const getDuration = (durationString = "") => {
    const duration = { hours: 0, minutes: 0, seconds: 0 };
    const durationParts = durationString
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    if (durationParts.length === 3) {
        duration["hours"] = durationParts[0];
        duration["minutes"] = durationParts[1];
        duration["seconds"] = durationParts[2];
    }

    if (durationParts.length === 2) {
        duration["minutes"] = durationParts[0];
        duration["seconds"] = durationParts[1];
    }

    if (durationParts.length === 1) {
        duration["seconds"] = durationParts[0];
    }

    return {
        ...duration,
        string: `${duration.hours}h${duration.minutes}m${duration.seconds}s`,
    };
};
async function getTime(url) {
    const id = url.split("v=")[1];
    // console.log(id)
    const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videoUrl.search = new URLSearchParams({
        key: "AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw",
        part: "contentDetails",
        id: id,
    }).toString();
    const data = await fetch(videoUrl)
        .then(async (response) => {
            const data = await response.json();
            const videos = data?.items || [];
            return videos.map((video) => {
                return {
                    id: video?.id,
                    duration: getDuration(video?.contentDetails?.duration),
                };
            });
        })
        .catch((error) => {
            console.warn(error);
        });

    return data[0];
}
module.exports = { getDuration, getTime };
