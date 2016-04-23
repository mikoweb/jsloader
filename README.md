## How to use

```javascript
// timeout (in milliseconds) for the request
jsloader.timeout(5000);
// add 'core' group
jsloader.group('core');
// add 'app' group which depends on the 'core'
jsloader.group('app', ['core']);
// add 'theme' group which depends on the 'core' and 'app'
jsloader.group('theme', ['core', 'app'])
// add app script
jsloader.add('app', ['main.js'], true);
// add core scripts
jsloader.add('core', ['jquery.js', 'bootstrap.js'], true);
// add theme script
jsloader.add('theme', ['theme.js'], true);
// do something when everything is loaded
jsloader.onLoad(function () {
    // ..
});
// do something when 'core' is loaded
jsloader.onLoad('core', function () {
    // ..
});
// start load
jsloader.init();
```
