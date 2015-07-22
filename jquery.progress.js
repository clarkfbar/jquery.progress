$.fn.extend({
  Progress: function(options){
    var settings = {
      width: 90, // ���������
      height: 20, // �������߶�
      percent: 0, // ��ǰռ��
      backgroundColor: '#555', // ������������ɫ
      barColor: '#d9534f', // ��������ɫ
      radius: 4, // �߽�Բ��
      fontSize: 12, // �����С
      increaseTime: 1000.00/60.00, // ÿһ�ε�����������ʱ��, Ĭ�����ʱ��(���Ե��󣬲�Ҫ��С)��ֻ����animateΪtrue���������Ч
      increaseSpeed: 1, // ÿ�ε����������ٶȣ�ֻ����animateΪtrue���������Ч
      animate: true // ������ʱ���Ƿ�ʹ�ö���������Ĭ��Ϊtrue
    };
    $.extend(settings, options);

    var $svg = $(this), $background, $bar, $g, $text, timeout;

    function progressPercent(p){
      if(!$.isNumeric(p) || p < 0) {
        return 0;
      } else if(p > 100) {
        return 100;
      } else {
        return p;
      }
    }        

    // ������ط���
    var Animate = {
      getWidth: function(){
        // ��ȡ��ǰ�Ŀ�ȣ������ܿ�Ⱥ�percent
        return settings.width * settings.percent / 100.00;
      },
      getPercent: function(currentWidth){
        // ���ݵ�ǰ�Ŀ�ȣ����㵱ǰ��percent
        return parseInt((100 * currentWidth / settings.width).toFixed(2));
      },
      animateWidth: function(currentWidth, targetWidth){
        // ��������
        timeout = setTimeout(function(){
          if(currentWidth > targetWidth) {
            if(currentWidth - settings.increaseSpeed <= targetWidth) {
              currentWidth = targetWidth;
            } else {
              currentWidth = currentWidth - settings.increaseSpeed;
            }
          } else if(currentWidth < targetWidth) {
            if(currentWidth + settings.increaseSpeed >= targetWidth) {
              currentWidth = targetWidth;
            } else {
              currentWidth = currentWidth + settings.increaseSpeed;
            }
          }

          $bar.attr("width", currentWidth);
          $text.html(Animate.getPercent(currentWidth) + "%");

          if(currentWidth != targetWidth) {
            Animate.animateWidth(currentWidth, targetWidth);
          }
        }, settings.increaseTime); 
      }
    }

    function svg(tag){
      return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }

    // ��ʼ������
    !!function(){
      settings.percent = progressPercent(settings.percent);

      $svg.attr({'width': settings.width, 'height': settings.height});

      $background = $(svg("rect")).appendTo($svg)
                      .attr({x: 0, rx: settings.radius, width: settings.width, height: settings.height, fill: settings.backgroundColor});

      $bar = $(svg("rect")).appendTo($svg)
                .attr({x: 0, rx: settings.radius, height: settings.height, fill: settings.barColor});

      $g = $(svg("g")).appendTo($svg)
                .attr({"fill": "#fff", "text-anchor": "middle", "font-family": "DejaVu Sans,Verdana,Geneva,sans-serif", "font-size": settings.fontSize});

      $text = $(svg("text")).appendTo($g)
                .attr({"x": settings.width/2.0, "y": settings.height/2.0 + settings.fontSize/3.0});

      draw();
    }();

    // ���ƽ�����
    function draw() {
      var targetWidth = Animate.getWidth();

      // �Ƿ�ʹ�ö�������
      if(settings.animate) {
        if(timeout) {
          clearTimeout(timeout);
        }
        var currentWidth = parseFloat($bar.attr("width"));
        if(!currentWidth) currentWidth = 0;

        Animate.animateWidth(currentWidth, targetWidth);
      } else {
        $bar.attr("width", targetWidth);
        $text.html(settings.percent + "%");
      }
    }

    this.percent = function (p) {
      if(p) {
        p = progressPercent(p);

        settings.percent = p;
        draw();
      }
      return settings.percent;
    }

    return this;
  }
});