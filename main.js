const npe = document.querySelector("#newpipe-export");
const yte = document.querySelector("#youtube-export")
const npi = document.querySelector("#newpipe-import");
const btnCsv = document.querySelector("#from-csv");
const btnJson = document.querySelector("#from-json");

function fromJSON(e) {
    e.preventDefault();

    const subs = JSON.parse(yte.value);
    const tmpl = JSON.parse(npe.value);

    tmpl.subscriptions = subs;
    npi.value = JSON.stringify(tmpl, null, 2);
}

function fromCSV(e) {
    e.preventDefault();

    const offset = yte.value.startsWith("Channel ID") ? 1 : 0;
    const subs = yte.value
        .split("\n")
        .slice(offset)
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.split(","))
        .map(([, url, name]) => ({ service_id: 0, url: url.replace("http:", "https:"), name }));


    const tmpl = JSON.parse(npe.value);

    tmpl.subscriptions = subs;
    npi.value = JSON.stringify(tmpl, null, 2);

}

btnCsv.addEventListener("click", fromCSV);
btnJson.addEventListener("click", fromJSON);