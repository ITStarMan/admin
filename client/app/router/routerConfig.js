
export default [
    {
        name:'start',
        url:"/start",
        template:'<start class="routename"></start>',
        lazyload:require("bundle?lazy&name=start!../components/start/start.js"),
        tracking:{
            key:'start'
        }
    },
    {
        name:'api',
        url:"/api",
        template:'<api class="routename"></api>',
        lazyload:require("bundle?lazy&name=api!../components/api/api.js"),
        tracking:{
            key:'api'
        }
    },
    {
        name:'developer',
        url:"/developer",
        template:'<developer class="routename"></developer>',
        lazyload:require("bundle?lazy&name=developer!../components/developer/developer.js"),
        tracking:{
            key:'developer'
        }
    },
    {
        name:'developeradd',
        url:"/developeradd",
        template:'<developeradd class="routename"></developeradd>',
        lazyload:require("bundle?lazy&name=developeradd!../components/developeradd/developeradd.js"),
        tracking:{
            key:'developeradd'
        }
    },
    {
        name:'journal',
        url:"/journal",
        template:'<journal class="routename"></journal>',
        lazyload:require("bundle?lazy&name=journal!../components/journal/journal.js"),
        tracking:{
            key:'journal'
        }
    },
    {
        name:'journaldetail',
        url:"/journaldetail/:id",
        template:'<journaldetail class="routename"></journaldetail>',
        lazyload:require("bundle?lazy&name=journaldetail!../components/journaldetail/journaldetail.js"),
        tracking:{
            key:'journaldetail'
        }
    },
    {
        name:'endpoint',
        url:"/endpoint",
        template:'<endpoint class="routename"></endpoint>',
        lazyload:require("bundle?lazy&name=endpoint!../components/endpoint/endpoint.js"),
        tracking:{
            key:'endpoint'
        }
    },
    {
        name:'endpointdetail',
        url:"/endpointdetail/:id",
        template:'<endpointdetail class="routename"></endpointdetail>',
        lazyload:require("bundle?lazy&name=endpointdetail!../components/endpointdetail/endpointdetail.js"),
        tracking:{
            key:'endpointdetail'
        }
    },
    {
        name:'info',
        url:"/apidetail/:ApiID",
        template:'<info class="routename"></info>',
        lazyload:require("bundle?lazy&name=info!../components/info/info.js"),
        tracking:{
            key:'info'
        }
    },
    {
        name:'subscribe',
        url:"/subscribe",
        template:'<subscribe class="routename"></subscribe>',
        lazyload:require("bundle?lazy&name=subscribe!../components/subscribe/subscribe.js"),
        tracking:{
            key:'subscribe'
        }
    },
    {
        name:'data',
        url:"/apidata/:ApiID",
        template:'<data class="routename"></data>',
        lazyload:require("bundle?lazy&name=data!../components/data/data.js"),
        tracking:{
            key:'data'
        }
    },
    {
        name:'endpointinfo',
        url:"/apiroute/:endpointid",
        template:'<endpointinfo class="routename"></endpointinfo>',
        lazyload:require("bundle?lazy&name=endpointinfo!../components/endpointinfo/endpointinfo.js"),
        tracking:{
            key:'endpointinfo'
        }
    },
    {
        name:'dashboard',
        url:"/dashboard",
        template:'<dashboard class="routename"></dashboard>',
        lazyload:require("bundle?lazy&name=dashboard!../components/dashboard/dashboard.js"),
        tracking:{
            key:'dashboard'
        }
    },
    {
        name:'developerinfo',
        url:"/developerinfo/:email",
        template:'<developerinfo class="routename"></developerinfo>',
        lazyload:require("bundle?lazy&name=developerinfo!../components/developerinfo/developerinfo.js"),
        tracking:{
            key:'developerinfo'
        }
    },
]
