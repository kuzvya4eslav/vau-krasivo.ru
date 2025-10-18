// Google Apps Script для экспорта услуг в JSON
// Создайте новый проект в script.google.com и вставьте этот код

function doGet() {
  try {
    // Получаем данные из Google Sheets
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Пропускаем заголовок (первая строка)
    const headers = data[0];
    const rows = data.slice(1);
    
    // Преобразуем данные в JSON
    const services = rows.map(row => {
      const service = {};
      headers.forEach((header, index) => {
        service[header] = row[index] || '';
      });
      return service;
    });
    
    // Группируем услуги по категориям
    const groupedServices = {
      brows: services.filter(s => s.category === 'брови'),
      permanent: services.filter(s => s.category === 'перманент'),
      lashes: services.filter(s => s.category === 'ресницы'),
      complexes: services.filter(s => s.category === 'комплексы')
    };
    
    // Возвращаем JSON
    return ContentService
      .createTextOutput(JSON.stringify(groupedServices))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Функция для тестирования
function testExport() {
  const result = doGet();
  console.log(result.getContent());
}
