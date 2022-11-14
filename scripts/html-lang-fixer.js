const fs = require('fs');

const BASE_PATH = './out';

function replaceLangTag(path, locale) {
  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  fs.writeFileSync(path, content.replace(/(<html lang=")en(" class="dark">)/, `$1${locale}$2`));
}

function htmlLangFixer(path) {
  const list = fs.readdirSync(path);

  list.forEach(el => {
    const currentPath = `${path}/${el}`;
    const stats = fs.lstatSync(currentPath);

    if (stats.isFile() && el.endsWith('.html')) {
      const result = currentPath.match(/^\.\/out\/(en|es|de|tr|uk|fr|ru|zh-cn)\/?/);

      if (result) {
        replaceLangTag(currentPath, result[1]);
      }
    } else if (stats.isDirectory()) {
      htmlLangFixer(currentPath);
    }
  });
}

htmlLangFixer(BASE_PATH);
