export function getResponse(data) {
    let resp = '';
    Object.keys(data).forEach(function (key) {
        resp = resp + (data[key] + '\n')
    });

    return resp
}
