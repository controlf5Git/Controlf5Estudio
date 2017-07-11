
/**********************************************************/
/**********************************************************/
/** MSD-Responsive.             Quodem Consultores S.L.  **/
/**********************************************************/
/**********************************************************/

//Methods debug code
function DebugResponsive(msg) { console.log(msg) };

//Methos error code
function DebugErrorResponsive(msg) { DebugResponsive("¡¡¡¡¡ERROR!!!!! " + msg) };

//Object Size configuration
function SizeResponsive(Name, ValueMin, ValueMax, Type)
{      
    //Properties
    this.Name = Name;
    this.ValueMin = ValueMin;
    this.ValueMax = ValueMax;
    this.Type = Type;
}

//Object Static App Responsive App JS Client
ConfigurationResponsive =
{
    Actions: ["hide", "show", "class"],
    TypeOlder: 0,
    TypeCurrent: 0,
    Sizes: [new SizeResponsive("Mobile", 0, 767, 1), new SizeResponsive("Tablet", 768, 980, 2), new SizeResponsive("Desktop", 981, 99999, 3)],
    addEventFunction: function (el, evtname, fnt) { try { if (el.attachEvent) { el.attachEvent(evtname, fnt); } else if (el.addEventListener) { el.addEventListener(evtname.replace("on", ""), fnt, false); } } catch (err) { DebugError("addEventFunction: " + err); } },
    addWindowEventFunction: function (evtname, fnt) { ConfigurationResponsive.addEventFunction(window, evtname, fnt); },
    addFunctionOnload: function (fnt) { ConfigurationResponsive.addWindowEventFunction("onload", fnt); },
    addFunctionOnunload: function (fnt) { ConfigurationResponsive.addWindowEventFunction("onunload", fnt); },
    addFunctionOnbeforeunload: function (fnt) { ConfigurationResponsive.addWindowEventFunction("onbeforeunload", fnt); },
    addFunctionOnResize: function (fnt) { ConfigurationResponsive.addWindowEventFunction("onresize", fnt); },
    Resize: function (size) { },
    ResizeOther: function (size) { },    
    Initializate: function () { },
    InitializateOther: function () { },    
    AddResizeEvent: function (funct) { addEvent(funct);  },
    AddInitizateEvent: function (funct) { addEvent(funct); },
    SizeCurrent: null,
	CurrentWidth:0    
}


//******************** METHODS OBJECT ********************************

//Initiate Object Capture OnLoad Page
function ConfigurationResponsive_Initializate() 
{   
    ConfigurationResponsive_Resize();    
    ConfigurationResponsive.Initializate();
    ConfigurationResponsive.InitializateOther();
    //adjusting content to Load    
}


function getInternetExplorerVersion()
{
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}



//Event Resize 
function ConfigurationResponsive_Resize()
 {
    var responsiveWidth = 0;
    var scrollbarWidth = 0;
    var resultIE8=false;
    responsiveWidth = getDocWidth();
    ConfigurationResponsive.CurrentWidth = responsiveWidth;
    var ieVersion = getInternetExplorerVersion();
    var ieVersionOld = (ieVersion == 6 || ieVersion == 7 || ieVersion == 8);

    //Version Older 9 no jobs media query
    if (ieVersionOld) 
    {   
        var indexDesktop = ConfigurationResponsive.Sizes.length - 1;
        ConfigurationResponsive.TypeCurrent = ConfigurationResponsive.Sizes[indexDesktop].Type;
        ConfigurationResponsive.SizeCurrent = ConfigurationResponsive.Sizes[indexDesktop];
        ConfigurationResponsive.TypeOlder = ConfigurationResponsive.Sizes[indexDesktop].Type;
        ConfigurationResponsive.Resize(ConfigurationResponsive.Sizes[indexDesktop]);
        ConfigurationResponsive.ResizeOther(ConfigurationResponsive.Sizes[indexDesktop]);
    }
    //Version IE9 media query JS error use width
    else if (ieVersion == 9) 
    {
        for (var i = 0; i < ConfigurationResponsive.Sizes.length; i++) {
            if (responsiveWidth >= ConfigurationResponsive.Sizes[i].ValueMin && responsiveWidth <= ConfigurationResponsive.Sizes[i].ValueMax) {
                ConfigurationResponsive.TypeCurrent = ConfigurationResponsive.Sizes[i].Type;
                ConfigurationResponsive.SizeCurrent = ConfigurationResponsive.Sizes[i];
                if (ConfigurationResponsive.TypeOlder != ConfigurationResponsive.Sizes[i].Type) {
                    ConfigurationResponsive.TypeOlder = ConfigurationResponsive.Sizes[i].Type;
                    ConfigurationResponsive.Resize(ConfigurationResponsive.Sizes[i]);
                    ConfigurationResponsive.ResizeOther(ConfigurationResponsive.Sizes[i]);
                }
            }
        }
    }
    //Other versions compatible Mozilla 6.0+, Google Chrome 9+, Safari 5.1,Firefoz Mobile,Google Chrome beta on Android
    else 
    {
    
        for (var i = 0; i < ConfigurationResponsive.Sizes.length; i++) {
            var mediaString = "(max-width: $px)";
            var mediaStringFind = mediaString.replace("$", ConfigurationResponsive.Sizes[i].ValueMax.toString());
            var mq = window.matchMedia(mediaStringFind);
            if (mq.matches) 
            {
                DebugResponsive("Si entra:" + responsiveWidth);
                ConfigurationResponsive.TypeCurrent = ConfigurationResponsive.Sizes[i].Type;
                ConfigurationResponsive.SizeCurrent = ConfigurationResponsive.Sizes[i];
                if (ConfigurationResponsive.TypeOlder != ConfigurationResponsive.Sizes[i].Type) {
                    ConfigurationResponsive.TypeOlder = ConfigurationResponsive.Sizes[i].Type;
                    ConfigurationResponsive.Resize(ConfigurationResponsive.Sizes[i]);
                    ConfigurationResponsive.ResizeOther(ConfigurationResponsive.Sizes[i]);
                }
                break;
            }
        } 
    }
}


//******************** METHODS UTILITY ********************************

//Height page document
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

//Witdh page document
function getDocWidth() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}


function addEvent(func) {
    var oldonload = ConfigurationResponsive.Resize;
    if (typeof ConfigurationResponsive.Resize != 'function') {
        ConfigurationResponsive.Resize = func;
    }
    else {
        ConfigurationResponsive.Resize = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

//******************** CONFIGURATION INITIAL  ********************************

ConfigurationResponsive.addFunctionOnload(ConfigurationResponsive_Initializate);
ConfigurationResponsive.addFunctionOnResize(ConfigurationResponsive_Resize);

