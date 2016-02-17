{
    "targets" : [
        {
            "target_name": "node-soem",
            "sources" : ["src/node-soem-master.cc" ],
            "include_dirs" : [ "../soem/soem", "../soem/osal", "../soem/osal/linux", "../soem/oshw/linux", "<!(node -e \"require('nan')\")" ],
            "libraries" : [ "-lsoem" ]
        }
    ]
}
