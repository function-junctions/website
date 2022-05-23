<script lang="ts">
  export let header = 'FUNCTION';
  export let subheader = 'Junctions';

  export let style = '';
</script>

<style lang="scss">
  $neonGlow: #f008b7;
  
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }

  .header-container-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .header-container {
    text-align: center;
    position: absolute;
    display: flex;
    filter: url(#outerGlow);
  }

  .header {
    color: white;
    font-family: 'Hauser Regular';
    font-size: 100px;
    text-shadow: 1px 10px 1px #919191;
    filter: url(#frontGradient) url(#backGradient) url(#innerGlow) url(#stroke);
    
  }

  .header-ends {
    font-size: 130px;
    margin-top: -13px;
    z-index: 2;
  }

  .subheader {
    font-family: 'Horsemen';
    display: flex;
    justify-content: center;
    font-size: 35px;
    color: white;
    z-index: 2;
    color: #F975F7;
    -webkit-text-stroke: 1px $neonGlow;
    filter: drop-shadow(2px 2px 20px $neonGlow);
  }
</style>

<div class="title" {style}>
  <div class="header-container-container">
    <div class="header-container">
      <div class="header header-ends" style="margin-right: 2px;" data-text={header.charAt(0)}>
        {header.charAt(0)}
      </div>
      <div class="header" data-text={header.substring(1, header.length - 1)}>
        {header.substring(1, header.length - 1)}
      </div>
      <div class="header header-ends" style="margin-left: 2px;" data-text={header.charAt(header.length - 1)}>
        {header.charAt(header.length - 1)}
      </div>
    </div>
    <svg>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="backGradientFill">
          <stop offset="0%" style="stop-color: #191c2b; stop-opacity: 100%;" />
          <stop offset="25%" style="stop-color: #191c2b; stop-opacity: 100%;" />
          <stop offset="48%" style="stop-color: #191c2b; stop-opacity: 100%;" />
          <stop offset="75%" style="stop-color: #ba94c0; stop-opacity: 100%;" />
          <stop offset="80%" style="stop-color: #e1b0fd; stop-opacity: 100%;" />
          
          <stop offset="100%" style="stop-color: white; stop-opacity: 0%;" />
        </linearGradient>
        
        <linearGradient x1="50%" y1="100%" x2="50%" y2="-10%" id="frontGradientFill">
          <stop offset="0%" style="stop-color: white; stop-opacity: 100%;" />
          <stop offset="5%" style="stop-color: white; stop-opacity: 100%;" />
          <stop offset="17%" style="stop-color: #cfe1fd; stop-opacity: 100%;" />
          <stop offset="22%" style="stop-color: #ba94c0; stop-opacity: 100%;" />
          <stop offset="26%" style="stop-color: #191c2b; stop-opacity: 100%;" />
          <stop offset="28%" style="stop-color: #191c2b; stop-opacity: 100%;" />
          <stop offset="30%" style="stop-color: white; stop-opacity: 100%;" />
          <stop offset="40%" style="stop-color: white; stop-opacity: 100%;" />
          <stop offset="50%" style="stop-color: #191c2b; stop-opacity: 100%;" />
        </linearGradient>
        
        <linearGradient x1="50%" y1="25%" x2="50%" y2="90%" id="strokeGradientFill">
          <stop offset="0%" style="stop-color: white; stop-opacity: 100%;" />    
          <stop offset="25%" style="stop-color: white; stop-opacity: 100%;" />
          <stop offset="35%" style="stop-color: #c68aee; stop-opacity: 100%;" />
          <stop offset="59%" style="stop-color: #854890; stop-opacity: 100%;" />
          <stop offset="80%" style="stop-color: #c68aee; stop-opacity: 100%;" />
          <stop offset="100%" style="stop-color: white; stop-opacity: 0%;" />
        </linearGradient>
    
        <rect id="gradient1" x="0%" y="10%" width="100%" height="55%" style="fill: url(#backGradientFill);" />
        <rect id="gradient2" x="0%" y="0" width="100%" height="100%" style="fill: url(#frontGradientFill);" />
        <rect id="gradient3" x="0%" y="0" width="100%" height="100%" style="fill: url(#strokeGradientFill);" />

        <filter id="backGradient">
          <feImage xlink:href="#gradient1" result="grad"/>
          <feComposite operator="atop" in2="SourceGraphic" in="thickened" result="stroke"/>
          <feMerge>
            <feMergeNode in="sourceGraphic"></feMergeNode>
            <feMergeNode in="stroke"></feMergeNode>
          </feMerge>
        </filter>
        
        <filter id="frontGradient">
          <feImage xlink:href="#gradient2" result="grad"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="1" result="turbulence" />
          <feDisplacementMap in2="turbulence" in="grad" scale="10" />
          <feComposite operator="in" in2="SourceGraphic" in="thickened" result="stroke" />
        </filter>
        
        <filter id="stroke">    
          <feFlood  flood-color="#dadde5" result="strokeColor" />
          <feImage xlink:href="#gradient3" result="strokeColor"/>
          <feMorphology operator="dilate" radius="1" in="SourceGraphic" result="outside" />
          <feMorphology operator="dilate" radius="2" in="outside" result="thickened" />
          <feComposite operator="out" in2="SourceGraphic" in="thickened" result="stroke"/>
          <feComposite operator="in" in="strokeColor" in2="stroke" result="stroke"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"></feMergeNode>
            <feMergeNode in="stroke"></feMergeNode>
          </feMerge>
        </filter>
        
        <filter id="innerGlow">
          <feFlood flood-color="#c45cff"/>
          <feComposite in2="SourceGraphic" operator="out"/>
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feComposite operator="atop" in2="SourceGraphic" result="glow"/>
          <feBlend in="SourceGraphic" in2="glow" mode="screen"></feBlend>
        </filter>
        
        <filter id="outerGlow" >
          <!-- Thicken out the original shape -->
          <feMorphology operator="dilate" radius="5" in="SourceAlpha" result="thicken" />
      
          <!-- Use a gaussian blur to create the soft blurriness of the glow -->
          <feGaussianBlur in="thicken" stdDeviation="20" result="blurred" />
      
          <!-- Change the colour -->
          <feFlood  flood-color="#603986" result="glowColor" />
      
          <!-- Color in the glows -->
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
      
          <!--	Layer the effects together -->
          <feMerge>
            <feMergeNode in="softGlow_colored"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
  <div class="subheader">{subheader}</div>
</div>

