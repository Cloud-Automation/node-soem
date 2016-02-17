{
    "targets" : [
        {
            "target_name": "node-soem",
            "sources" : [ 
                "src/node-soem-master.cc" 
            ],
            "include_dirs" : [ 
                "lib/soem", 
                "lib/osal", 
                "lib/osal/linux", 
                "lib/oshw/linux", 
                "<!(node -e \"require('nan')\")" 
            ],
            "ldflags" : [
                "-Wl,-rpath,lib/build"
            ],
            "libraries" : [ 
                "-lsoem" 
            ]
        }
    ]
}
