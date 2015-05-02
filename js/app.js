/*
 hotspot-user-token-generator v1.0

 The MIT License (MIT)

 Copyright (c) 2015 Frédéric Bolvin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function () {
  var btnClear, btnGo, btnPassword;
  var tbName, tbUsername, tbPassword;
  var pdfConfig;

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function loadConfig() {
    var request = new XMLHttpRequest();
    request.open('GET', 'config.json', true);
    request.overrideMimeType("application/json");

    request.onload = function() {
      try {
        pdfConfig = JSON.parse(this.response);
      } catch (e) {
        console.log('Error loading config: ' + e.message);
      }
    };

    request.onerror = function() {
    };

    request.send();
  }

  function generatePassword(length) {
    // Build the password dictionary
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    chars += chars.toUpperCase();
    for (var i = 0; i <= 9; i++) chars += i;
    chars += '+-_!?';

    // Build the password with random chars from dictionary
    var pwd = '';
    for (i = 0; i < length+1; i++) {
      pwd += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    loadConfig();
    return pwd;
  }

  function makePDF() {
    var docDefinition = {
      content: [
        {
          columns: [
            {
              image: pdfConfig.Logo,
              width: 100
            },
            { text: pdfConfig.Title, style: 'header' },
            { text: 'Datum: ' + new Date().toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}), alignment: 'right' }
          ],
          margin: [0, 0, 0, 40]
        },
        { text: pdfConfig.Introdution,
          margin: [0, 80, 0, 20]
        },
        {
          table: {
            widths: [ 120, 200 ],
            body: [
              ['Name', tbName.value],
              ['Benutzername', tbUsername.value],
              ['Passwort', tbPassword.value]
            ]
          },
          margin: [0, 5, 0, 40]
        },
        {
          text: pdfConfig.Addon
        }
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 13]
        }
      },
      footer: {
        text: pdfConfig.Footer,
        fontSize: 8,
        alignment: 'center'
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }

  function clearForm() {
    tbName.value = '';
    tbUsername.value = '';
    tbPassword.value = '';
  }

  function randomPassword() {
    tbPassword.value = generatePassword(8);
  }

  ready(function () {
    btnClear = document.querySelector('.btn-danger');
    btnGo = document.querySelector('.btn-primary');
    btnPassword = document.querySelector('.input-group-addon');
    tbName = document.getElementById('inputName');
    tbUsername = document.getElementById('inputUsername');
    tbPassword = document.getElementById('inputPassword');

    btnClear.addEventListener('click', clearForm);
    btnGo.addEventListener('click', makePDF);
    btnPassword.addEventListener('click', randomPassword);

    loadConfig();
  });
})();