$(document).ready(function() {
    const npe = document.getElementById("newpipe-export");
    const yte = document.getElementById("youtube-export");
    const npi = document.getElementById("newpipe-import");
    const btnCsv = document.getElementById("from-csv");
    const btnRow = document.getElementById("from-name-url");

    function fromCSV(e) {
        e.preventDefault();

        const offset = yte.value.startsWith("Channel Id") ? 1 : 0;
        const subs = yte.value
            .split("\n")
            .slice(offset)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => line.split(","))
            .map(([, url, name]) => ({
                service_id: 0,
                url: url.replace("http:", "https:"),
                name,
            }));

        const tmpl = JSON.parse(npe.value);

        tmpl.subscriptions = subs;
        npi.value = JSON.stringify(tmpl, null, 2);
    }

    function fromNameUrl(e) {
        e.preventDefault();

        const subs = yte.value
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => line.split(/(http)/))
            .map(([name, prefix, url]) => ({
                service_id: 0,
                url: (prefix + url).replace("http:", "https:"),
                name: url.split('/').pop(),
                //name: name.trim(),
            }));

        const tmpl = JSON.parse(npe.value);

        tmpl.subscriptions = subs;
        npi.value = JSON.stringify(tmpl, null, 2);
    }

    btnCsv.addEventListener("click", fromCSV);
    btnRow.addEventListener("click", fromNameUrl);

    console.log("Event listeners are ready!");
});
