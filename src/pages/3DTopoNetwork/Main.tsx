import data from './data.json'
import * as THREE from 'three';
import SpriteText from 'three-spritetext'
import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph';
let Mydata = JSON.parse(JSON.stringify(data))



const Main = () => {
  const fgRef = useRef();
  const distance = 800;
  const [radio, setRadio] = useState(true)
  let interval;
  useEffect(() => {
    fgRef.current.d3Force("link").distance(links => links.distance);
    // camera orbit
    let angle = 0;
    if (radio === true) {
      fgRef.current.cameraPosition({ z: distance });
      interval = setInterval(() => {
        fgRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 300;
      }, 30)
    }
    return () => {
      return clearInterval(interval)
    }

  }, [radio]);



  const rootId = 0;
  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries(Mydata.nodes.map(node => [node.id, node]));
    console.log('nodesById', nodesById)

    // link parent/children
    Mydata.nodes.forEach(node => {
      node.collapsed = node.id===1||node.id===2||node.id===3;
      node.childLinks = [];
    });
    Mydata.links.forEach(link => nodesById[link.source].childLinks.push(link));

    return nodesById;
  }, [Mydata]);


  const getPrunedTree = useCallback(() => {

    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById[rootId]) {
      console.log('nodesById[]', node)
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...node.childLinks);
      node.childLinks
        .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const GROUPS = 12

  const [prunedTree, setPrunedTree] = useState(getPrunedTree() as any);
  const handleNodeClick = useCallback(node => {
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree())
  }, []);

  return (
    <section className="flex-1 grid grid-rows-2 w-full overflow-hidden  gap-6 pb-10">
      <div className="grid grid-cols-2  gap-6" onClick={() => setRadio(false)}>
        <ForceGraph3D
          ref={fgRef}
          nodeLabel="id"
          enableNodeDrag={true}
          enableNavigationControls={true}
          showNavInfo={true}
          onNodeClick={handleNodeClick}
          graphData={prunedTree}
          backgroundColor='rgba(0,0,0,0)'
          nodeThreeObject={({ img, name, logMessage, collapsed, childLinks }) => {
            const group = new THREE.Group();


            

            if (logMessage === 'Error') {
              let size = 3;
              if (collapsed)
                size = 1
              console.log(childLinks)
              const geometry = new THREE.SphereGeometry(size * 20, size * 20, size * 20);
              const materialModel = new THREE.MeshBasicMaterial({
                color: 'red', transparent: true, opacity: 0.3,
                depthWrite: false, // Tắt ghi depth để phần trong vẫn được nhìn thấy
                depthTest: true
              }); // Màu đỏ cho node
              const sphere = new THREE.Mesh(geometry, materialModel);
              group.add(sphere);
            }
            //          if(logMessage==='Error'){
            //             const geometry = new THREE.BoxGeometry(100,100,100);
            // const materialModel = new THREE.MeshLambertMaterial({ color: 'red', transparent: true, opacity: 0.2 }); // Màu đỏ cho node
            // const sphere = new THREE.Mesh(geometry, materialModel);
            // group.add(sphere);

            //          }

            //Check img message
            let imgLogMessage = ''
            switch (logMessage) {
              case 'Safe':
                imgLogMessage = 'safe.png'
                break;
              case 'Warn':
                imgLogMessage = 'warn.png'
                break;
              case 'Info':
                imgLogMessage = 'info.png'
                break;
              case 'Error':
                imgLogMessage = 'error.png'
                break;
              default:
                break;
            }
            const imgTextureLogMessage = new THREE.TextureLoader().load(`./src/pages/3DTopoNetwork/imgs/${imgLogMessage}`);
            imgTextureLogMessage.colorSpace = THREE.SRGBColorSpace;
            const materialLogMessage = new THREE.SpriteMaterial({ map: imgTextureLogMessage });
            const spriteLogMessage = new THREE.Sprite(materialLogMessage);
            spriteLogMessage.scale.set(8, 8);
            spriteLogMessage.position.set(9, 5); // Position the text below the image
            group.add(spriteLogMessage);


            // Create texture for the image
            const imgTexture = new THREE.TextureLoader().load(`./src/pages/3DTopoNetwork/imgs/${img}`);
            imgTexture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({ map: imgTexture });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(12, 12);
            group.add(sprite);


            //Check Img collapsed

            let imgTextureCollapsed
            if (collapsed && childLinks.length !== 0) {
              imgTextureCollapsed = new THREE.TextureLoader().load(`./src/pages/3DTopoNetwork/imgs/circle_green.png`);
              imgTextureCollapsed.colorSpace = THREE.SRGBColorSpace;
              const materialCollapsed = new THREE.SpriteMaterial({ map: imgTextureCollapsed });
              const spriteCollapsed = new THREE.Sprite(materialCollapsed);
              spriteCollapsed.scale.set(25, 25);
              spriteCollapsed.position.set(-3, 3); // Position the text below the image

              group.add(spriteCollapsed);
            }

            const textSprite = new SpriteText(name);
            textSprite.color = "#fff";
            textSprite.textHeight = 8;
            const offsetY = -10; // Adjust this value to position the text as needed
            textSprite.position.set(0, offsetY); // Position the text below the image
            group.add(textSprite);
            return group;
          }}
          //linkAutoColorBy={d => prunedTree.nodes[d.source].id % GROUPS}
          linkColor={(link) => {
            console.log('link', link)
            if (link.source.logMessage === 'Error')
              return 'red'
            else if (link.source.logMessage === 'Warn')
              return 'yellow'
            return 'green'
          }}
          linkWidth={1}
          linkDirectionalParticles={5}
          linkOpacity={0.6}
        />
      </div>
    </section>

  )
}
export default Main