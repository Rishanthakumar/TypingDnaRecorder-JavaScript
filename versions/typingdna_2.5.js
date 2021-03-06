/**
 * TypingDNA - Typing Biometrics JavaScript API
 * http://api.typingdna.com/scripts/typingdna.js
 * http://typingdna.com/scripts/typingdna.js (alternative)
 *
 * @version 2.5
 * @author Raul Popa
 * @copyright SC TypingDNA SRL, http://typingdna.com
 * @license http://www.apache.org/licenses/LICENSE-2.0
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Typical usage:
 * var tdna = new TypingDNA(); // creates a new TypingDNA object and starts recording
 * var typingPattern = tdna.get(); // returns a typing pattern (and continues recording afterwards),
 * optionally you can pass a length, tdna.get(200) will return the pattern based on the last 200 key events.
 *
 * Optional:
 * tdna.stop(); // ends recording and clears history stack (returns recording flag: false)
 * tdna.start(); // restarts the recording after a stop (returns recording flag: true)
 * tdna.reset(); // restarts the recording anytime, clears history stack and starts from scratch (returns nothing)
 * var typingPatternQuality = TypingDNA.getQuality(typingPattern); //returns the quality/strength of any typing pattern
 * (there is no need to initialize the class to do pattern quality checking)
 */

/**
 * Creates a single instance (or a reference) of the TypingDNA class
 * @param  {Number} maxHistoryLength Optional: The maximum length of the
 * history stack, default:2000; optimal lengths needed for good quality
 * typing patterns are between 500 and 5000, you can also pass 0 for default.
 * @return {Object} Returns the single instance of the TypingDNA class.
 * @example var tdna = new TypingDNA();
 * @example var tdna = new TypingDNA(0);
 * @example var tdna = new TypingDNA(300);
 */
function TypingDNA(maxHistoryLength) {
  if (TypingDNA.initialized != true) {
    TypingDNA.prototype.start = function() {
      return TypingDNA.start.apply(this, arguments);
    }
    TypingDNA.prototype.stop = function() {
      return TypingDNA.stop.apply(this, arguments);
    }
    TypingDNA.prototype.reset = function() {
      return TypingDNA.reset.apply(this, arguments);
    }
    TypingDNA.prototype.addTarget = function() {
      return TypingDNA.addTarget.apply(this, arguments);
    }
    TypingDNA.prototype.removeTarget = function() {
      return TypingDNA.removeTarget.apply(this, arguments);
    }
    TypingDNA.prototype.get = function(args) {
      return TypingDNA.get.apply(this, arguments);
    }
    TypingDNA.prototype.startDiagram = function() {
      return TypingDNA.startDiagram.apply(this, arguments);
    }
    TypingDNA.prototype.stopDiagram = function() {
      return TypingDNA.stopDiagram.apply(this, arguments);
    }
    TypingDNA.prototype.getDiagram = function(args) {
      return TypingDNA.getDiagram.apply(this, arguments);
    }
    TypingDNA.prototype.getExtendedDiagram = function(args) {
      return TypingDNA.getExtendedDiagram.apply(this, arguments);
    }
    TypingDNA.prototype.startMouse = function() {
      return TypingDNA.startMouse.apply(this, arguments);
    }
    TypingDNA.prototype.stopMouse = function() {
      return TypingDNA.stopMouse.apply(this, arguments);
    }
    TypingDNA.prototype.getQuality = function(args) {
      return TypingDNA.getQuality.apply(this, arguments);
    }
    TypingDNA.prototype.getLength = function(args) {
      return TypingDNA.getLength.apply(this, arguments);
    }
    TypingDNA.prototype.isMobile = function(args) {
      return TypingDNA.isMobile.apply(this, arguments);
    }
    TypingDNA.initialized = true;
    TypingDNA.prototype.maxHistoryLength = TypingDNA.maxHistoryLength;
    TypingDNA.prototype.defaultHistoryLength = TypingDNA.defaultHistoryLength;
    TypingDNA.prototype.maxSeekTime = TypingDNA.maxSeekTime;
    TypingDNA.prototype.maxPressTime = TypingDNA.maxPressTime;
    TypingDNA.version = 2.5;
    TypingDNA.flags = 0;
    TypingDNA.instance = this;
    TypingDNA.element = document;
    TypingDNA.maxHistoryLength = 2000;
    TypingDNA.maxSeekTime = 1500;
    TypingDNA.maxPressTime = 300;
    TypingDNA.defaultHistoryLength = 500;
    TypingDNA.spKeyCodes = [8,13];
    TypingDNA.spKeyCodesObj = {8:1,13:1};
    TypingDNA.keyCodes = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,32,222,188,190,186,187,189,191,48,49,50,51,52,53,54,55,56,57];
    TypingDNA.keyCodesObj = {65:1,66:1,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:1,75:1,76:1,77:1,78:1,79:1,80:1,81:1,82:1,83:1,84:1,85:1,86:1,87:1,88:1,89:1,90:1,32:1,222:1,188:1,190:1,186:1,187:1,189:1,191:1,48:1,49:1,50:1,51:1,52:1,53:1,54:1,55:1,56:1,57:1}
    TypingDNA.pt1 = TypingDNA.ut1 = (new Date).getTime();
    TypingDNA.wfk = [];
    TypingDNA.sti = [];
    TypingDNA.skt = [];
    TypingDNA.recording = true;
    TypingDNA.mouseRecording = true;
    TypingDNA.spKeyRecording = true;
    TypingDNA.diagramRecording = false;
    TypingDNA.dwfk = [];
    TypingDNA.dsti = [];
    TypingDNA.dskt = [];
    TypingDNA.drkc = [];
    TypingDNA.dlastDownKey;
    TypingDNA.prevKeyCode = 0;
    TypingDNA.lastMouseMoveTime = TypingDNA.lastMouseDownTime = (new Date).getTime();
    TypingDNA.maxStopTime = 1500;
    TypingDNA.maxClickTime = 600;
    TypingDNA.stopTimes = [];
    TypingDNA.clickTimes = [];
    TypingDNA.zl = 0.0000001;
    TypingDNA.isAndroidChrome = false;
    TypingDNA.AClastTime = (new Date).getTime();
    TypingDNA.ACseekTime = 0;
    TypingDNA.ACpressTime = 0;
    TypingDNA.AClastCharCode = 0;
    TypingDNA.AClastKeyCode = 0;
    TypingDNA.ACflagDownTI = 0;
    TypingDNA.ACpreviousKeyCode = 0;
    TypingDNA.targetIds = [];
    TypingDNA.lastTarget = "";
    TypingDNA.lastTargetFound = false;

    TypingDNA.keydown = function(e) {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      if (!TypingDNA.isTarget(e.target.id)) {
        return;
      }
      var keyCode = e.keyCode;
      if (keyCode == 229 && TypingDNA.isMobile() && !TypingDNA.isAndroidChrome) {
        TypingDNA.isAndroidChrome = true;

        TypingDNA.ACseekTime = (new Date).getTime() - TypingDNA.AClastTime;
        TypingDNA.AClastTime = (new Date).getTime();
        TypingDNA.ACflagDownTI = 1;

        TypingDNA.element.removeEventListener("keydown", TypingDNA.keydown);
        TypingDNA.element.removeEventListener("keyup", TypingDNA.keyup);
        TypingDNA.element.removeEventListener("keypress", TypingDNA.keypress);

        // if android
        TypingDNA.element.addEventListener("textInput", TypingDNA.ACtextInput);
        TypingDNA.element.addEventListener("keydown", TypingDNA.ACkeydown);
        TypingDNA.element.addEventListener("keyup", TypingDNA.ACkeyup);
      } else {
        var t0 = TypingDNA.pt1;
        TypingDNA.pt1 = (new Date).getTime();
        var seekTotal = TypingDNA.pt1 - t0;
        var startTime = TypingDNA.pt1;
        if (TypingDNA.recording == true || (TypingDNA.spKeyCodesObj[keyCode] && TypingDNA.spKeyRecording == true)) {
          if (!e.shiftKey || TypingDNA.isMobile()) {
            TypingDNA.wfk[keyCode] = 1;
            TypingDNA.skt[keyCode] = seekTotal;
            TypingDNA.sti[keyCode] = startTime;
          }
        }
        if (TypingDNA.diagramRecording == true) {
          TypingDNA.dwfk[keyCode] = 1;
          TypingDNA.dskt[keyCode] = seekTotal;
          TypingDNA.dsti[keyCode] = startTime;
          TypingDNA.dlastDownKey = keyCode;
        }
      }
    }

    TypingDNA.keypress = function(e) {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      if (!TypingDNA.isTarget(e.target.id)) {
        return;
      }
      if (TypingDNA.diagramRecording == true) {
        var keyCode = TypingDNA.dlastDownKey;
        TypingDNA.drkc[keyCode] = e.charCode;
      }
    }

    TypingDNA.keyup = function(e) {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      if (!TypingDNA.isTarget(e.target.id)) {
        return;
      }
      var ut = (new Date).getTime();
      var keyCode = e.keyCode;
      if (TypingDNA.recording == true || (TypingDNA.spKeyCodesObj[keyCode] && TypingDNA.spKeyRecording == true)) {
        if (!e.shiftKey || TypingDNA.isMobile()) {
          if (TypingDNA.wfk[keyCode] == 1) {
            var pressTime = ut - TypingDNA.sti[keyCode];
            var seekTime = TypingDNA.skt[keyCode];
            var arr = [keyCode, seekTime, pressTime, TypingDNA.prevKeyCode, ut];
            TypingDNA.history.add(arr);
            TypingDNA.prevKeyCode = keyCode;
          }
        }
        TypingDNA.wfk[keyCode] = 0;
      }
      if (TypingDNA.diagramRecording == true) {
        if (TypingDNA.drkc[keyCode] != undefined && TypingDNA.drkc[keyCode] != 0) {
          if (TypingDNA.dwfk[keyCode] == 1) {
            var pressTime = ut - TypingDNA.dsti[keyCode];
            var seekTime = TypingDNA.dskt[keyCode];
            var realKeyCode = TypingDNA.drkc[keyCode];
            var arrD = [keyCode, seekTime, pressTime, realKeyCode];
            TypingDNA.history.addDiagram(arrD);
          }
        }
        TypingDNA.dwfk[keyCode] = 0;
      }
    }

    TypingDNA.mousemove = function(e) {
      if (TypingDNA.mouseRecording == true) {
        TypingDNA.lastMouseMoveTime = (new Date).getTime();
      }
    }

    TypingDNA.mousedown = function(e) {
      if (TypingDNA.mouseRecording == true) {
        if (e.which == 1) {
          TypingDNA.lastMouseDownTime = (new Date).getTime();
          var stopTime = TypingDNA.lastMouseDownTime - TypingDNA.lastMouseMoveTime;
          if (stopTime < TypingDNA.maxStopTime) {
            TypingDNA.stopTimes.push(stopTime);
          }
        }
      }
    }

    TypingDNA.mouseup = function(e) {
      if (TypingDNA.mouseRecording == true) {
        if (e.which == 1) {
          var clickTime = (new Date).getTime() - TypingDNA.lastMouseDownTime;
          if (clickTime < TypingDNA.maxClickTime && TypingDNA.lastMouseDownTime > TypingDNA.lastMouseMoveTime) {
            TypingDNA.clickTimes.push(clickTime);
          }
        }
      }
    }

    TypingDNA.ACkeydown = function(e) {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      TypingDNA.ACseekTime = (new Date).getTime() - TypingDNA.AClastTime;
      TypingDNA.AClastTime = (new Date).getTime();
      if (!TypingDNA.isTarget(e.target.id)) {
        return;
      }
      if (e.keyCode == 229) {
        TypingDNA.ACflagDownTI = 1;
      }
    }

    TypingDNA.ACtextInput = function(e) {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      if (TypingDNA.ACflagDownTI = 1) {
        TypingDNA.AClastCharCode = e.data.charCodeAt(0);
        TypingDNA.AClastKeyCode = e.data.toUpperCase().charCodeAt(0);
        TypingDNA.ACflagDownTI = 0;
      }
    }

    TypingDNA.ACkeyup = function(e)  {
      if (!TypingDNA.recording && !TypingDNA.diagramRecording) {
        return;
      }
      TypingDNA.ACpressTime = (new Date).getTime() - TypingDNA.AClastTime;
      TypingDNA.AClastTime = (new Date).getTime();
      if (!TypingDNA.isTarget(e.target.id)) {
        return;
      }
      var keyCode = e.keyCode;
      if (keyCode == 229 && TypingDNA.ACflagDownTI == 0) {
        keyCode = TypingDNA.AClastKeyCode;
      }
      var arr = [keyCode, TypingDNA.ACseekTime, TypingDNA.ACpressTime, TypingDNA.ACpreviousKeyCode, TypingDNA.AClastTime];
      TypingDNA.history.add(arr);
      TypingDNA.ACpreviousKeyCode = keyCode;
      if (TypingDNA.diagramRecording == true && TypingDNA.ACflagDownTI == 0) {
        var arrD = [keyCode, TypingDNA.ACseekTime, TypingDNA.ACpressTime, TypingDNA.AClastCharCode];
        TypingDNA.history.addDiagram(arrD);
      }
    }

    TypingDNA.isTarget = function(target) {
      if (TypingDNA.lastTarget == target && TypingDNA.lastTargetFound) {
        return true;
      } else {
        var targetLength = TypingDNA.targetIds.length;
        var targetFound = false;
        if (targetLength > 0) {
          for (var i = 0; i < targetLength; i++) {
            if (TypingDNA.targetIds[i] == target) {
              targetFound = true;
              break;
            }
          }
          TypingDNA.lastTarget = target;
          TypingDNA.lastTargetFound = targetFound;
          return targetFound;
        } else {
          TypingDNA.lastTarget = target;
          TypingDNA.lastTargetFound = true;
          return true;
        }
      }
    }

    if (TypingDNA.element.addEventListener) {
      TypingDNA.element.addEventListener("keydown", TypingDNA.keydown);
      TypingDNA.element.addEventListener("keyup", TypingDNA.keyup);
      TypingDNA.element.addEventListener("keypress", TypingDNA.keypress);
      TypingDNA.element.addEventListener("mousemove", TypingDNA.mousemove);
      TypingDNA.element.addEventListener("mousedown", TypingDNA.mousedown);
      TypingDNA.element.addEventListener("mouseup", TypingDNA.mouseup);
    } else if (TypingDNA.element.attachEvent) {
      TypingDNA.element.attachEvent("onkeydown", TypingDNA.keydown);
      TypingDNA.element.attachEvent("onkeyup", TypingDNA.keyup);
      TypingDNA.element.attachEvent("onkeypress", TypingDNA.keypress);
      TypingDNA.element.attachEvent("onmousemove", TypingDNA.mousemove);
      TypingDNA.element.attachEvent("onmousedown", TypingDNA.mousedown);
      TypingDNA.element.attachEvent("onmouseup", TypingDNA.mouseup);
    } else {
      console.log("browser not supported");
    }

    /**
     * Adds a target to the targetIds array.
     */
    TypingDNA.addTarget = function(target) {
      var targetLength = TypingDNA.targetIds.length;
      var targetFound = false;
      if (targetLength > 0) {
        for (var i = 0; i < targetLength; i++) {
          if (TypingDNA.targetIds[i] == target) {
            targetFound = true;
            break;
          }
        }
        if (!targetFound) {
          TypingDNA.targetIds.push(target);
        }
      } else {
        TypingDNA.targetIds.push(target);
      }
    }

    /**
     * Adds a target to the targetIds array.
     */
    TypingDNA.removeTarget = function(target) {
      var targetLength = TypingDNA.targetIds.length;
      if (targetLength > 0) {
        for (var i = 0; i < targetLength; i++) {
          if (TypingDNA.targetIds[i] == target) {
            TypingDNA.targetIds.splice(i, 1);
            break;
          }
        }
      }
    }

    /**
     * Resets the history stack
     */
    TypingDNA.reset = function() {
      TypingDNA.history.stack = [];
      TypingDNA.history.stackDiagram = [];
      TypingDNA.clickTimes = [];
      TypingDNA.stopTimes = [];
    }

    /**
     * Automatically called at initilization. It starts the recording of keystrokes.
     */
    TypingDNA.start = function() {
      return TypingDNA.recording = true;
    }

    /**
     * Ends the recording of further keystrokes. To restart recording afterwards you can
     * either call TypingDNA.start() or create a new TypingDNA object again, not recommended.
     */
    TypingDNA.stop = function() {
      return TypingDNA.recording = false;
    }

    /**
     * Starts the recording of mouse activity.
     */
    TypingDNA.startMouse = function() {
      return TypingDNA.mouseRecording = true;
    }

    /**
     * Stops the recording of mouse activity.
     */
    TypingDNA.stopMouse = function() {
      return TypingDNA.mouseRecording = false;
    }

    /**
     * Starts the recording of a non-fixed diagram typing pattern.
     */
    TypingDNA.startDiagram = function() {
      return TypingDNA.diagramRecording = true;
    }

    /**
     * Ends the recording of a non-fixed diagram typing pattern.
     */
    TypingDNA.stopDiagram = function() {
      return TypingDNA.diagramRecording = false;
    }

    /**
     * This function outputs the linear diagram typing pattern as a String
     * @param  {String} str Optional: The string represented by the diagram
     * The function checks for the exact string (with minor typos) in the recorded
     * history. Any letters that are not included in the string will be ommited from
     * the output diagram typing pattern.
     * @return {String} The TypingDNA linear diagram typing pattern, comma separated.
     * A non-fixed vector of only numeric values separated by commas.
     * @example var typingPattern = tdna.getDiagram();
     * @example var typingPattern = tdna.getDiagram("Hello5g21?*");
     */
    TypingDNA.getDiagram = function(str) {
      return TypingDNA.history.getDiagram(false, str);
    }

    /**
     * This function outputs the extended linear diagram typing pattern as a String
     * Compared to getDiagram, it includes char codes (not safe for storage)
     * @param  {String} str Optional: The string represented by the diagram
     * The function checks for the exact string (with minor typos) in the recorded
     * history. Any letters that are not included in the string will be ommited from
     * the output diagram typing pattern.
     * @return {String} The TypingDNA linear diagram typing pattern, comma separated.
     * A non-fixed vector of only numeric values separated by commas.
     * @example var typingPattern = tdna.getExtendedDiagram();
     * @example var typingPattern = tdna.getExtendedDiagram("Hello5g21?*");
     */
    TypingDNA.getExtendedDiagram = function(str) {
      return TypingDNA.history.getDiagram(true, str);
    }

    /**
     * This function outputs the typing pattern as a String, in a new basic structure for
     * easy storage and usage in any kind of keystroke dynamics applications (e.g. typing
     * pattern matching, user recognition)
     * @param  {Number} length Optional: The amount of history keystrokes to use for the
     * typing pattern. By default it will use the last 500 recorded keystrokes (or as many
     * available if less than 500).
     * @return {String}        The TypingDNA typing pattern, comma separated.
     * A fixed vector of only numeric values separated by commas.
     * @example var typingPattern = tdna.get();
     * @example var typingPattern = tdna.get(200);
     */
    TypingDNA.get = function(length) {
      var historyTotalLength = TypingDNA.history.stack.length;
      if (length == undefined) {
        length = TypingDNA.defaultHistoryLength;
      }
      if (length > historyTotalLength) {
        length = historyTotalLength;
      }
      var obj = {};
      obj.arr = TypingDNA.history.get(length);
      var zl = TypingDNA.zl;
      var histRev = length;
      var histSktF = TypingDNA.math.fo(TypingDNA.history.get(length, "seek"));
      var histPrtF = TypingDNA.math.fo(TypingDNA.history.get(length, "press"));
      var histRevPF = histPrtF.length;
      var histRevSF = histSktF.length;
      var pressHistMean = Math.round(TypingDNA.math.avg(histPrtF));
      var seekHistMean = Math.round(TypingDNA.math.avg(histSktF));
      var pressHistSD = Math.round(TypingDNA.math.sd(histPrtF));
      var seekHistSD = Math.round(TypingDNA.math.sd(histSktF));
      var charMeanTime = seekHistMean + pressHistMean;
      var pressRatio = TypingDNA.math.rd((pressHistMean + zl) / (charMeanTime + zl), 4);
      var seekToPressRatio = TypingDNA.math.rd((1 - pressRatio)/pressRatio, 4);
      var pressSDToPressRatio = TypingDNA.math.rd((pressHistSD + zl) / (pressHistMean + zl), 4);
      var seekSDToPressRatio = TypingDNA.math.rd((seekHistSD + zl) / (pressHistMean + zl), 4);
      var cpm = Math.round(6E4 / (charMeanTime + zl));
      for (var i in obj.arr) {
        var rev = obj.arr[i][1].length;
        var seekMean = 0;
        var pressMean = 0;
        var postMean = 0;
        var seekSD = 0;
        var pressSD = 0;
        var postSD = 0;
        switch (obj.arr[i][0].length) {
          case 0:
            break;
          case 1:
            var seekMean = TypingDNA.math.rd((obj.arr[i][0][0] + zl) / (seekHistMean + zl), 4);
            break;
          default:
            var arr = TypingDNA.math.fo(obj.arr[i][0]);
            seekMean = TypingDNA.math.rd((TypingDNA.math.avg(arr) + zl) / (seekHistMean + zl), 4);
            seekSD = TypingDNA.math.rd((TypingDNA.math.sd(arr) + zl) / (seekHistSD + zl), 4);
        }
        switch (obj.arr[i][1].length) {
          case 0:
            break;
          case 1:
            var pressMean = TypingDNA.math.rd((obj.arr[i][1][0] + zl) / (pressHistMean + zl), 4);
            break;
          default:
            var arr = TypingDNA.math.fo(obj.arr[i][1]);
            pressMean = TypingDNA.math.rd((TypingDNA.math.avg(arr) + zl) / (pressHistMean + zl), 4);
            pressSD = TypingDNA.math.rd((TypingDNA.math.sd(arr) + zl) / (pressHistSD + zl), 4);
        }
        switch (obj.arr[i][2].length) {
          case 0:
            break;
          case 1:
            var postMean = TypingDNA.math.rd((obj.arr[i][2][0] + zl) / (seekHistMean + zl), 4);
            break;
          default:
            var arr = TypingDNA.math.fo(obj.arr[i][2]);
            postMean = TypingDNA.math.rd((TypingDNA.math.avg(arr) + zl) / (seekHistMean + zl), 4);
            postSD = TypingDNA.math.rd((TypingDNA.math.sd(arr) + zl) / (seekHistSD + zl), 4);
        }
        delete obj.arr[i][2];
        delete obj.arr[i][1];
        delete obj.arr[i][0];
        obj.arr[i][0] = rev;
        obj.arr[i][1] = seekMean;
        obj.arr[i][2] = pressMean;
        obj.arr[i][3] = postMean;
        obj.arr[i][4] = seekSD;
        obj.arr[i][5] = pressSD;
        obj.arr[i][6] = postSD;
      }
      var arr = [];
      TypingDNA.apu(arr, histRev);
      TypingDNA.apu(arr, cpm);
      TypingDNA.apu(arr, charMeanTime);
      TypingDNA.apu(arr, pressRatio);
      TypingDNA.apu(arr, seekToPressRatio);
      TypingDNA.apu(arr, pressSDToPressRatio);
      TypingDNA.apu(arr, seekSDToPressRatio);
      TypingDNA.apu(arr, pressHistMean);
      TypingDNA.apu(arr, seekHistMean);
      TypingDNA.apu(arr, pressHistSD);
      TypingDNA.apu(arr, seekHistSD);
      for (var c = 0; c <= 6; c++) {
        for (var i = 0; i < 44; i++) {
          var keyCode = TypingDNA.keyCodes[i];
          var val = obj.arr[keyCode][c];
          if (val == 0 && c > 0) {
            val = 1;
          }
          TypingDNA.apu(arr, val);
        }
      }
      TypingDNA.apu(arr, TypingDNA.isMobile());
      TypingDNA.apu(arr, TypingDNA.version);
      TypingDNA.apu(arr, TypingDNA.flags);
      arr.push(TypingDNA.history.getSpecialKeys());
      return arr.join(",");
    }

    TypingDNA.apu = function(arr, val) {
      "NaN" == String(val) && (val = 0);
      arr.push(val);
    }

    TypingDNA.math = {};

    TypingDNA.math.rd = function(val, dec) {
      return Number(val.toFixed(dec));
    }

    TypingDNA.math.avg = function(arr) {
      var len = arr.length;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        sum += arr[i];
      }
      return this.rd(sum / len, 4);
    }

    TypingDNA.math.sd = function(arr) {
      var len = arr.length;
      if (len < 2) {
        return 0;
      } else {
        var sumVS = 0;
        var mean = this.avg(arr);
        for (var i = 0; i < len; i++) {
          sumVS += (arr[i] - mean) * (arr[i] - mean);
        }
        var sd = Math.sqrt(sumVS / len);
        return sd;
      }
    }

    TypingDNA.math.fo = function(arr) {
      if (arr.length > 1) {
        var values = arr.concat();
        var len = arr.length;
        values.sort(function(a, b) {
          return a - b;
        });
        var asd = this.sd(values);
        var aMean = values[Math.ceil(arr.length / 2)];
        var multiplier = 2;
        var maxVal = aMean + multiplier * asd;
        var minVal = aMean - multiplier * asd;
        if (len < 20) {
          minVal = 0;
        }
        var fVal = [];
        for (var i = 0; i < len; i++) {
          var tempval = values[i];
          if (tempval < maxVal && tempval > minVal) {
            fVal.push(tempval);
          }
        }
        return fVal;
      } else {
        return arr;
      }
    }

    TypingDNA.history = {};
    TypingDNA.history.stack = [];
    TypingDNA.history.stackDiagram = [];

    TypingDNA.history.add = function(arr) {
      this.stack.push(arr);
      if (this.stack.length > TypingDNA.maxHistoryLength) {
        this.stack.shift();
      }
    }

    TypingDNA.history.addDiagram = function(arr) {
      this.stackDiagram.push(arr);
    }

    TypingDNA.history.getDiagram = function(extended, str) {
      var returnArr = [];
      returnArr.push(TypingDNA.isMobile());
      returnArr.push(TypingDNA.version);
      returnArr.push(TypingDNA.flags);
      returnArr.push(TypingDNA.history.getSpecialKeys());
      var diagramType = (extended) ? 1 : 0;
      returnArr.push(diagramType);
      var diagramHistoryLength = this.stackDiagram.length;
      var targetLength = TypingDNA.targetIds.length;
      if (str == undefined && targetLength > 0) {
        str = "";
        for (var i = 0; i < targetLength; i++) {
          str += document.getElementById(TypingDNA.targetIds[i]).value;
        }
      }
      if (str != undefined) {
        var solvedAstr = [];
        var lastPos = 0;
        for (var i = 0; i < str.length; i++) {
          var currentCharCode = str.charCodeAt(i);
          for (var j = lastPos; j < diagramHistoryLength; j++) {
            var arr = this.stackDiagram[j];
            var charCode = arr[3];
            if (charCode == currentCharCode) {
              if (j == lastPos) {
                lastPos++;
              }
              var seekTime = arr[1];
              var pressTime = arr[2];
              if (extended) {
                returnArr.push(charCode, seekTime, pressTime);
              } else {
                returnArr.push(seekTime, pressTime);
              }
              break;
            }
          }
        }
      } else {
        for (var i = 0; i < diagramHistoryLength; i++) {
          var arr = this.stackDiagram[i];
          var seekTime = arr[1];
          var pressTime = arr[2];
          if (extended) {
            var charCode = arr[3];
            returnArr.push(charCode, seekTime, pressTime);
          } else {
            returnArr.push(seekTime, pressTime);
          }
        }
      }
      return returnArr.join(",");
    }

    TypingDNA.history.get = function(length, type) {
      var historyTotalLength = this.stack.length;
      if (length == 0 || length == undefined) {
        length = TypingDNA.defaultHistoryLength;
      }
      if (length > historyTotalLength) {
        length = historyTotalLength;
      }
      switch (type) {
        case "seek":
          var seekArr = [];
          for (i = 1; i <= length; i++) {
            var seekTime = this.stack[historyTotalLength - i][1];
            if (seekTime <= TypingDNA.maxSeekTime) {
              seekArr.push(seekTime);
            }
          };
          return seekArr;
          break;
        case "press":
          var pressArr = [];
          for (i = 1; i <= length; i++) {
            var pressTime = this.stack[historyTotalLength - i][2];
            if (pressTime <= TypingDNA.maxPressTime) {
              pressArr.push(pressTime);
            }
          };
          return pressArr;
          break;
        default:
          var historyStackObj = {};
          for (var i in TypingDNA.keyCodes) {
            historyStackObj[TypingDNA.keyCodes[i]] = [
              [],
              [],
              []
            ];
          }
          for (i = 1; i <= length; i++) {
            var arr = this.stack[historyTotalLength - i];
            var keyCode = arr[0];
            var seekTime = arr[1];
            var pressTime = arr[2];
            var prevKeyCode = arr[3];
            if (TypingDNA.keyCodesObj[keyCode]) {
              if (seekTime <= TypingDNA.maxSeekTime) {
                historyStackObj[keyCode][0].push(seekTime);
                if (prevKeyCode != 0 && TypingDNA.keyCodesObj[prevKeyCode]) {
                  historyStackObj[prevKeyCode][2].push(seekTime);
                }
              }
              if (pressTime <= TypingDNA.maxPressTime) {
                historyStackObj[keyCode][1].push(pressTime);
              }
            }
          };
          return historyStackObj;
      }
    }

    TypingDNA.history.getSpecialKeys = function() {
      var returnArr = [];
      var length = this.stack.length;
      var historyStackObj = {};
      for (var i in TypingDNA.spKeyCodes) {
        historyStackObj[TypingDNA.spKeyCodes[i]] = [
          [],
        ];
      }
      for (i = 1; i <= length; i++) {
        var arr = this.stack[length - i];
        if (TypingDNA.spKeyCodesObj[arr[0]]) {
          var keyCode = arr[0];
          var pressTime = arr[2];
          if (pressTime <= TypingDNA.maxPressTime) {
            historyStackObj[keyCode][0].push(pressTime);
          }
        }
      }
      for (var i in TypingDNA.spKeyCodes) {
        var arr = TypingDNA.math.fo(historyStackObj[TypingDNA.spKeyCodes[i]][0]);
        var arrLen = arr.length;
        returnArr.push(arrLen);
        if (arrLen > 1) {
          returnArr.push(Math.round(TypingDNA.math.avg(arr)));
          returnArr.push(Math.round(TypingDNA.math.sd(arr)));
        } else if (arrLen == 1) {
          returnArr.push([arr[0],-1]);
        } else {
          returnArr.push([-1,-1]);
        }
      }
      var clicksArrLen = TypingDNA.clickTimes.length;
      returnArr.push(clicksArrLen);
      if (clicksArrLen > 1) {
        returnArr.push(Math.round(TypingDNA.math.avg(TypingDNA.clickTimes)));
        returnArr.push(Math.round(TypingDNA.math.sd(TypingDNA.clickTimes)));
      } else if (clicksArrLen == 1) {
        returnArr.push(TypingDNA.clickTimes[0],-1);
      } else {
        returnArr.push([-1,-1]);
      }
      var stopArrLen = TypingDNA.stopTimes.length;
      returnArr.push(stopArrLen);
      if (stopArrLen > 1) {
        returnArr.push(Math.round(TypingDNA.math.avg(TypingDNA.stopTimes)));
        returnArr.push(Math.round(TypingDNA.math.sd(TypingDNA.stopTimes)));
      } else if (stopArrLen == 1) {
        returnArr.push(TypingDNA.stopTimes[0],-1);
      } else {
        returnArr.push([-1,-1]);
      }
      return returnArr;
    }

    /**
     * Checks the quality of a typing pattern, how well it is revelated, how useful the
     * information will be for matching applications. It returns a value between 0 and 1.
     * Values over 0.3 are acceptable, however a value over 0.7 shows good pattern strength.
     * @param  {String} typingPattern The typing pattern string returned by the get() function.
     * @return {Number} A real number between 0 and 1. A close to 1 value means a stronger pattern.
     * @example var quality = tdna.getQuality(typingPattern);
     */
    TypingDNA.getQuality = function(typingPattern) {
      var obj = typingPattern.split(",");
      for (i = 0; i < obj.length; i++) {
        obj[i] = Number(obj[i]);
      }
      var totalEvents = obj[0];
      var acc = rec = avgAcc = 0;
      var avg = TypingDNA.math.avg(obj);
      var revs = obj.slice(11, 55);
      for (var i in revs) {
        rec += Number(revs[i] > 0);
        acc += Number(revs[i] > 4);
        avgAcc += Number(revs[i] > avg);
      }
      var tReturn = Math.sqrt(rec * acc * avgAcc) / 80;
      return tReturn > 1 ? 1 : tReturn;
    }

    TypingDNA.getLength = function(typingPattern) {
      return Number(typingPattern.split(",")[1]);
    }

    TypingDNA.isMobile = function() {
      if (TypingDNA.mobile != undefined) {
        return TypingDNA.mobile;
      } else {
        var check = 0;
        (function(a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
            .test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(a.substr(0, 4))) {
            check = 1
          }
        })(navigator.userAgent || navigator.vendor || window.opera);
        TypingDNA.mobile = check;
        return check;
      }
    }
  } else {
    // TypingDNA is a static class, currently doesn't support actual multiple instances (Singleton implementation)
    return TypingDNA.instance;
  }
}
