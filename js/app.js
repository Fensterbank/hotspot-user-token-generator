/*
 hotspot-user-token-generator v0.1

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
    request.open('GET', 'config.stbonifatius.json', true);
    request.overrideMimeType("application/json");

    request.onload = function() {
      try {
        pdfConfig = JSON.parse(this.response);
      } catch (e) {
        console.log('Error loading config: ' + e.message);
      }
      console.log(pdfConfig);
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
        { text: 'Datum: 10.12.2014', alignment: 'right' },
        { text: pdfConfig.Title, style: 'header' },
        { text: pdfConfig.Introdution },
        {
          image: 'sampleImage.jpg',
          width: 150
        },
        {
          style: 'credentials',
          table: {
            body: [
              ['Name', tbName.value],
              ['Benutzername', tbUsername.value],
              ['Passwort', tbPassword.value]
            ]
          }
        },
        { text: pdfConfig.Addon },
        { text: pdfConfig.Footer }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        credentials: {
          margin: [0, 5, 0, 15]
        }
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
    btnPassword = document.querySelector('.glyphicon-fire');
    tbName = document.getElementById('inputName');
    tbUsername = document.getElementById('inputUsername');
    tbPassword = document.getElementById('inputPassword');

    btnClear.addEventListener('click', clearForm);
    btnGo.addEventListener('click', makePDF);
    btnPassword.addEventListener('click', randomPassword);

    loadConfig();
  });
})();