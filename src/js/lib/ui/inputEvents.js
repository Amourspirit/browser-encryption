import $ from 'jquery';
import {
  clBtnEnc,
  clBtnDec,
  clPlain,
  clChipher,
  clUrl,
  clBtnSwap,
  clBtnShort
} from '../misc/element-instances';
(function () {
 
  const hasContentChipher = () => {
    const content = clChipher().get();
    return content.length > 0;
  };
  const hasContentPlain = () => {
    const content = clPlain().get();
    return content.length > 0;
  };
  const hasContentUrl = () => {
    const content = clUrl().get();
    return content.length > 0;
  };

  $(clPlain().el).on('change keyup paste input textarea', function () {
    if (hasContentPlain()) {
      clBtnEnc().disabled = false;
      clBtnDec().disabled = false;
      clBtnSwap().disabled = false;
    } else {
      clBtnEnc().disabled = true;
      clBtnDec().disabled = true;
      clBtnSwap().disabled = !hasContentChipher();
    }
  });
  $(clChipher().el).on('change keyup paste input textarea', function () {
    if (hasContentChipher()) {
      clBtnSwap().disabled = false;
    } else {
      clBtnSwap().disabled = !hasContentPlain();
    }
  });
  $(clUrl().el).on('change keyup paste input', function () {
    if (hasContentUrl()) {
      clBtnShort().disabled = false;
    } else {
      clBtnShort().disabled = !hasContentUrl();
    }
  });
}());
