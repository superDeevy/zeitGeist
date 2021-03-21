import React, { useState } from "react";
import { Carousel, Card, Button, Modal, Space, Row, Col, Divider} from "antd";
import ReactJson from 'react-json-view'
const { BufferList } = require('bl')
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

//helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
    for await (const file of ipfs.get(hashToGet)) {
      console.log(file.path)
      if (!file.content) continue;
      const content = new BufferList()
      for await (const chunk of file.content) {
        content.append(chunk)
      }
      console.log(content)
      return content
    }
  }


export default function MemoryLane({
    memories
  }) {
    let memoryLane = memories.asPlayer.map((a) => 
        <div> 
            <Card>
                <div>
                    <p>
                        Preview of: {a.ipfsHash} 
                    </p>
                    <p>
                        {/* {a.data} */}
                    </p>
                </div>
            </Card>
        </div>
        )

    return (<div>
        <Carousel autoplay>
          {memoryLane}
        </Carousel>
      </div>
    )
  }
  
