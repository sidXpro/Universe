// Create the visualization and put it in our div.

const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
  startDate: new Date(2020, 0, 2),
  jdPerSecond: 30,
  camera: {
    enableDrift: true,
  },
  debug: {
    showAxesHelper: true,
    showStats: false,
  },
});


const iconUrl = '{{assets}}/sprites/smallparticle.png';

viz.createAmbientLight();
viz.createLight([0, 0, 0]);

// Create a skybox using NASA TYCHO artwork.
viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);
createStandardSolarSystemObjects();
// configureLacadiaAsteroidObjects();
// configureSun()
configureMercury();
configureVenus();
configureEarth();
configureMars();
configureJupiter();
configureSaturn();
configureUranus();
configureNeptune();
configurePluto();
// configureMarsAndMarsOrbiter();
// configureRenderedAsteroid();

function createStandardSolarSystemObjects() {
  viz.createObject(
    'Sun',
    Object.assign(Spacekit.SpaceObjectPresets.SUN, {
      radius: 13 // Set the radius in kilometers (or scale as needed)
    })
  );
}


async function configureLacadiaAsteroidObjects() {
  const lacadieraEphemFile = await fetch('./lacadiera_ephem.json').then(
    (response) => response.json(),
  );

  const lacadieraEphem = new Spacekit.EphemerisTable(lacadieraEphemFile);

  const color = 0xffff00;
  const lacadiera = viz.createObject('Lacadiera', {
    ephemTable: lacadieraEphem,
    textureUrl: iconUrl,
    scale: [0.1, 0.1, 0.1],
    orbitPathSettings: {
      leadDurationYears: 0.5,
      trailDurationYears: 0.5,
      numberSamplePoints: 30,
    },
    theme: {
      orbitColor: color,
      color: color,
    },
    ecliptic: {
      displayLines: true,
      lineColor: color,
    },
    labelText: 'Lacadiera',
  });

  const lacadieraSat = viz.createObject('LacadieraSat', {
    labelText: 'LacadieraSat',
    ephem: new Spacekit.Ephem(
      {
        // These parameters define orbit shape.
        a: 0.3,
        e: 0.5,
        i: 52,

        // These parameters define the orientation of the orbit.
        om: 3.170946964325638e2,
        w: 1.774865822248395e2,
        ma: 1.764302192487955e2,

        // Where the object is in its orbit.
        epoch: 2458426.5,
      },
      'deg',
    ),
  });
  lacadieraSat.orbitAround(lacadiera);
}

// async function configureSun() {
//   viz.createSphere('Sun', {
//     textureUrl: './planets_texture/2k_sun.jpg',
//     // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
//     radius: 2, // Exxagerate Jupiter's size

//     // ephemTable: jupiterEphemeris,
//     // ephem: new Spacekit.Ephem(
//     //   {
//     //   epoch: 2458426.5,
//     //   a: 2*3.870968969437096e-1,
//     //   e: 2.056515875393916e-1,
//     //   i: 7.003891682749818,
//     //   om: 4.830774804443502e1,
//     //   w: 2.917940253442659e1,
//     //   ma: 2.56190975209273e2,
//     //   },
//     //   'deg',
//     //   true /* locked */,
//     // ),
//     // levelsOfDetail: [
//     //   { radii: 0, segments: 64 },
//     //   { radii: 30, segments: 16 },
//     //   { radii: 60, segments: 8 },
//     // ],
//     atmosphere: {
//       enable: true,
//       color: 0xc7c1a8,
//     },
//     rotation: {
//       enable: true,
//       speed: 0.5,
//     },
//     // orbitPathSettings: {
//     //   leadDurationYears: 12,
//     // },
//     labelText: 'Sun',
//   });
// }
// viz.setPosition('Sun', { x: 0, y: 0, z: 0 });

async function configureMercury() {
  viz.createSphere('Mercury', {
    textureUrl: './planets_texture/2k_mercury.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.066, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*3.870968969437096e-1,
      e: 2.056515875393916e-1,
      i: 7.003891682749818,
      om: 4.830774804443502e1,
      w: 2.917940253442659e1,
      ma: 2.56190975209273e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Mercury',
  });
}


async function configureVenus() {
  viz.createSphere('Venus', {
    textureUrl: './planets_texture/2k_venus_surface.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.19, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
        epoch: 2458426.5,
        a: 5 * 7.233458663591554e-1,
        e: 6.762510759617694e-3,
        i: 3.394567787211735,
        om: 7.662534150657346e1,
        w: 5.474567447560867e1,
        ma: 2.756687596099721e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Venus',
  });
}

async function configureEarth() {
  const earth = viz.createSphere('Earth', {
    textureUrl: './planets_texture/2k_earth_daymap.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.2, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.500000000,
      a: 5*1.000618919441359E+00,
      e: 1.676780871638673E-02,
      i: 0,
      om: 1.888900932218542E+02,
      w: 2.718307282052625E+02,
      ma: 3.021792498388233E+02,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    orbitPathSettings: {
      color: 0x00ff00, // Green color for Earth's orbit
      leadDurationYears: 1,
      trailDurationYears: 1,
    },
    labelText: 'Earth',
  });


  // Create the Moon object
const moon = viz.createSphere('Moon', {
  radius: 0.05, // Moon's radius in kilometers
  textureUrl: './planets_texture/2k_moon.jpg', // Path to your Moon texture image
  labelText: 'Moon',
  ephem: new Spacekit.Ephem(
  {
    GM: 0.3986e6,
    epoch: 2458621.5,
    a: 0.5,
    e: 4.582543645168888e-2,
    i: 5.102060246928811,
    om: 1.085916732144811e2,
    w: 6.180561793729225e1,
    ma: 5.053270083636792e1,
  },
  'deg',
  true /* locked */,
  ),

  rotation: {
    enable: true,
    speed: 1,
  },
});
// const moon = viz.createObject('moon', Spacekit.SpaceObjectPresets.MOON);
moon.orbitAround(earth);

moon.getOrbit().setVisibility(false);
moon.getOrbit().setHexColor(0x00ff00);
moon.setLabelVisibility(false);

}



async function configureMars() {

  viz.createSphere('Mars', {
    textureUrl: './planets_texture/2k_mars.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.1, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*1.52371401537107,
      e: 9.336741335309606e-2,
      i: 1.848141099825311,
      om: 4.950420572080223e1,
      w: 2.866965847685386e2,
      ma: 2.538237617924876e1,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Mars',
  });
}



async function configureJupiter() {
  // const jupiterEphemFile = await fetch('./jupiter.json').then((r) => r.json());
  // const jupiterEphemeris = new Spacekit.EphemerisTable(jupiterEphemFile);
  viz.createSphere('jupiter2', {
    textureUrl: './planets_texture/2k_jupiter.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 2.2, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*5.20180355911023,
      e: 4.89912558249006e-2,
      i: 1.303560894624275,
      om: 1.005203828847816e2,
      w: 2.73736301845404e2,
      ma: 2.31939544389401e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: false,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 0.5,
    },
    orbitPathSettings: {
      leadDurationYears: 12,
    },
    labelText: 'Jupiter',
  });
}


async function configureSaturn() {
  const saturn = viz.createSphere('Saturn', {
    textureUrl: './planets_texture/2k_saturn.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 1.8, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*9.577177295536776,
      e: 5.101889921719987e-2,
      i: 2.482782449972317,
      om: 1.136154964073247e2,
      w: 3.394422648650336e2,
      ma: 1.870970898012944e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: false,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 0.5,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Saturn',
    // occludeLabels: true,
  });
  saturn.addRings(299276167, 3*269276167, './planets_texture/2k_saturn_ring_alpha.png');
}


async function configureUranus() {
  // const jupiterEphemFile = await fetch('./jupiter.json').then((r) => r.json());
  // const jupiterEphemeris = new Spacekit.EphemerisTable(jupiterEphemFile);
  viz.createSphere('Uranus', {
    textureUrl: './planets_texture/2k_uranus.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.8, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*1.914496966635462e1,
      e: 4.832662948112808e-2,
      i: 7.697511134483724e-1,
      om: 7.414239045667875e1,
      w: 9.942704504702185e1,
      ma: 2.202603033874267e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Uranus',
  });
}


async function configureNeptune() {
  // const jupiterEphemFile = await fetch('./jupiter.json').then((r) => r.json());
  // const jupiterEphemeris = new Spacekit.EphemerisTable(jupiterEphemFile);
  viz.createSphere('Neptune', {
    textureUrl: './planets_texture/2k_neptune.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.7, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2458426.5,
      a: 5*3.00962226342805e1,
      e: 7.36257118719377e-3,
      i: 1.774569249829094,
      om: 1.318695882492132e2,
      w: 2.586226409499831e2,
      ma: 3.152804988924479e2,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Neptune',
  });
}

async function configurePluto() {
  // const jupiterEphemFile = await fetch('./jupiter.json').then((r) => r.json());
  // const jupiterEphemeris = new Spacekit.EphemerisTable(jupiterEphemFile);
  viz.createSphere('Pluto', {
    textureUrl: './planets_texture/2k_mercury.jpg',
    // radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
    radius: 0.04, // Exxagerate Jupiter's size
    // ephemTable: jupiterEphemeris,
    ephem: new Spacekit.Ephem(
      {
      epoch: 2454000.5,
      a: 5*39.4450697257,
      e: 0.250248713478,
      i: 17.0890009196,
      om: 110.376957955,
      w: 112.597141677,
      ma: 25.2471897122,
      },
      'deg',
      true /* locked */,
    ),
    // levelsOfDetail: [
    //   { radii: 0, segments: 64 },
    //   { radii: 30, segments: 16 },
    //   { radii: 60, segments: 8 },
    // ],
    atmosphere: {
      enable: true,
      color: 0xc7c1a8,
    },
    rotation: {
      enable: true,
      speed: 2,
    },
    // orbitPathSettings: {
    //   leadDurationYears: 12,
    // },
    labelText: 'Pluto',
  });
}




async function configureRenderedAsteroid() {
  const asteroidEphemFile = await fetch('./asteroid.json').then((response) =>
    response.json(),
  );

  const asteroidEphm = new Spacekit.EphemerisTable(asteroidEphemFile);

  const asteroid = viz.createShape('asteroid', {
    ephemTable: asteroidEphm,
    shape: {
      shapeUrl:
        'https://raw.githubusercontent.com/typpo/spacekit/master/examples/asteroid_shape_from_earth/A1046.M1863.obj',
    },
    rotation: {
      lambdaDeg: 251,
      betaDeg: -63,
      period: 3.755067,
      yorp: 1.9e-8,
      phi0: 0,
      jd0: 2443568.0,
    },
    labelText: 'Asteroid',
  });

  asteroid.initRotation();
  asteroid.startRotation();

  const satEphemFile = await fetch('./satEphem.json').then((response) =>
    response.json(),
  );

  const satEphemeris = new Spacekit.EphemerisTable(satEphemFile);

  const color = 0x174b7a;
  const asteroidSat = viz.createObject('AsteroidSat', {
    ephemTable: satEphemeris,
    textureUrl: iconUrl,
    scale: [0.1, 0.1, 0.1],
    orbitPathSettings: {
      leadDurationYears: 0.2,
      trailDurationYears: 0.2,
      numberSamplePoints: 120,
    },
    theme: {
      orbitColor: color,
      color: color,
    },
    labelText: 'AsteroidSat',
  });

  asteroidSat.orbitAround(asteroid);
}

async function configureMarsAndMarsOrbiter() {
  const mars = viz.createObject(
    'Mars',
    Object.assign(Spacekit.SpaceObjectPresets.MARS, {
      labelText: 'Mars',
    }),
  );

  const satEphemFile = await fetch('./satEphem.json').then((response) =>
    response.json(),
  );

  const satEphemeris = new Spacekit.EphemerisTable(satEphemFile);

  const color = 0x187c23;
  const marsSat = viz.createObject('MarsSat', {
    ephemTable: satEphemeris,
    textureUrl: iconUrl,
    scale: [0.1, 0.1, 0.1],
    orbitPathSettings: {
      leadDurationYears: 0.01,
      trailDurationYears: 0.01,
      numberSamplePoints: 60,
    },
    theme: {
      orbitColor: color,
      color: color,
    },
    labelText: 'MarsSat',
  });

  marsSat.orbitAround(mars);
}

// Set up event listeners

document.getElementById('btn-start').onclick = function () {
  viz.start();
};
document.getElementById('btn-stop').onclick = function () {
  viz.stop();
};
document.getElementById('btn-set-time').onclick = function () {
  viz.setDate(new Date(prompt('Enter a date (YYYY-mm-dd)')));
};

document.getElementById('btn-set-jd-per-second').onclick = function () {
  viz.setJdPerSecond(parseInt(prompt('Enter jd per second'), 10));
};

document.getElementById('btn-faster').onclick = function () {
  viz.setJdDelta(viz.getJdDelta() * 1.5);
};

document.getElementById('btn-slower').onclick = function () {
  viz.setJdDelta(viz.getJdDelta() * 0.5);
};

const dateElt = document.getElementById('current-date');
viz.onTick = function () {
  const d = viz.getDate();
  dateElt.innerHTML = d.toLocaleDateString();
};



document.getElementById('Jupiter').onclick = function () {
  const targetUrl = '../jupiter/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window


};


document.getElementById('Saturn').onclick = function () {
  const targetUrl = '../saturn/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window


};

document.getElementById('Black').onclick = function () {
  const targetUrl = '../static-particle-field/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window


};

document.getElementById('Meteor').onclick = function () {
  const targetUrl = '../meteor-shower/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window


};

document.getElementById('Aestroids').onclick = function () {
  const targetUrl = '../asteroid/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window


};

document.getElementById('quiz_start').onclick = function () {
  const targetUrl = '../quiz/index.html'; // Path to the file
  window.open(targetUrl, '_blank'); // Open in a new tab or window
};

document.getElementById('Moon').onclick = function () {
  
};


window.THREE = Spacekit.THREE;
