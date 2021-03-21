import React, { useState, useEffect } from "react";
import { Carousel, Card, Button, Modal, Space, Row, Col, Divider} from "antd";
import ReactJson from 'react-json-view'
import Demo1 from './demo1.jpg';
import Demo2 from './demo2.jpg';
import Demo3 from './demo3.jpg';
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

    // const [ yourCollectibles, setYourCollectibles ] = useState()

    // useEffect(()=>{
    //   const updateYourCollectibles = async () => {
    //     let collectibleUpdate = []
    //     console.log('memGiven', memories)
    //     for(var m of memories.asPlayer){
    //       try{
    //         // const ipfsHash =  tokenURI.replace("https://ipfs.io/ipfs/","")
    //         const ipfsHash = m.ipfsHash
    //         console.log("ipfsHash",ipfsHash)
  
    //         const jsonManifestBuffer = await getFromIPFS(ipfsHash)
  
    //         try{
    //           const jsonManifest = JSON.parse(jsonManifestBuffer.toString())
    //           console.log("jsonManifest",jsonManifest)
    //           collectibleUpdate.push({ ...m, ...jsonManifest})
    //         }catch(e){console.log(e)}
  
    //       }catch(e){console.log(e)}
    //     }
    //     setYourCollectibles(collectibleUpdate)
    //   }
    //   updateYourCollectibles()
    // },[ memories ])

    // console.log('fromipdsmemories', yourCollectibles)

  let demoLane = [
    <Card>
    <div >
        <p>
        tokenId: 1
        description: "so much fun!"
        witness: matze.eth
        </p>
      <img src={Demo1} width={300}/>
    </div>
      </Card>,
    <Card>
    <div >
        <p>
        tokenId: 2
        description: "I thought so too"
        witness: djuju.eth
        </p>
      <img src={Demo3} width={300}/>
    </div>
      </Card>,
    // <Card>
    // <div >
    //     <p>
    //     tokenId: 2
    //     description: "I thought so too"
    //     witness: djuju.eth
    //     </p>
    //   <img src={Demo2} width={300}/>
    // </div>
    //   </Card>
    ]

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
  memoryLane = demoLane.concat(memoryLane)

    return (<div>
        <Carousel autoplay>
          {memoryLane}
        </Carousel>
      </div>
    )
  }
  
