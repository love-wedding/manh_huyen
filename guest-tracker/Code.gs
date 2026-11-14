// Deploy this file as a Google Apps Script Web app.
// Keep this in sync with ADMIN_TOKEN in index.html, then redeploy the web app.
const ADMIN_TOKEN = 'minhle2312';
const SHEET_NAME = 'Khach moi';
const HEADERS = ['id', 'name', 'views', 'lastViewed', 'createdAt'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function output_(data, callback) {
  const json = JSON.stringify(data);
  if (callback && !/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) callback = '';
  return callback
    ? ContentService.createTextOutput(callback + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT)
    : ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const p = e.parameter || {};
  const sh = sheet_();
  if (p.action === 'view') {
    const id = String(p.id || '');
    if (id) {
      const rows = sh.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) if (String(rows[i][0]) === id) {
        sh.getRange(i + 1, 3).setValue(Number(rows[i][2] || 0) + 1);
        sh.getRange(i + 1, 4).setValue(new Date());
        break;
      }
    }
    return output_({ok: true});
  }
  if (p.action === 'list') {
    if (p.token !== ADMIN_TOKEN) return output_({ok: false, error: 'Mã quản trị không đúng.'}, p.callback);
    const rows = sh.getDataRange().getValues().slice(1).filter(r => r[0]);
    const guests = rows.map(r => ({id: String(r[0]), name: String(r[1]), views: Number(r[2] || 0), lastViewed: r[3] ? new Date(r[3]).toLocaleString('vi-VN') : ''}));
    return output_({ok: true, guests}, p.callback);
  }
  return output_({ok: false, error: 'Action không hợp lệ.'}, p.callback);
}

function doPost(e) {
  const p = e.parameter || {};
  if (p.action !== 'add' || p.token !== ADMIN_TOKEN) return output_({ok: false, error: 'Yêu cầu không hợp lệ.'});
  const id = String(p.id || '').trim();
  const name = String(p.name || '').trim();
  if (!id || !name) return output_({ok: false, error: 'Thiếu mã hoặc tên khách.'});
  const sh = sheet_();
  const rows = sh.getDataRange().getValues();
  if (!rows.slice(1).some(r => String(r[0]) === id)) sh.appendRow([id, name, 0, '', new Date()]);
  return output_({ok: true});
}
