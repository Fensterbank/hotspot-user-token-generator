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

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
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
    return pwd;
  }

  function makePDF() {

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
  });
})();