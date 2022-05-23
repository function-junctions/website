<script lang="ts">
  export let header = 'FUNCTION';
  export let subheader = 'Junctions';

  export let primaryA = '#a441d2';
  export let primaryB = '#e8b7ff';
  export let secondary = '#f975f7';

  export let style = '';
</script>

<style lang="scss">
  $neonGlow: #f008b7;
  
  .title {
    display: flex;
    flex-direction: column;
    user-select: none;

    .header-container-container {
      display: flex;
      justify-content: center;

      .header-container {
        text-align: center;
        position: absolute;
        display: flex;
        filter: url(#outerGlow);
        text-transform: uppercase;

        .header {
          color: white;
          font-family: 'Hauser Regular';
          font-size: 90px;
          position: relative;
          background-image: linear-gradient(
            #101117 20% 50%,
            var(--theme-primary-a) 55%,
            var(--theme-primary-b) 59%,
            white 63% 70%, 
            #191c2b 70% 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-width: 0.1rem;
          -webkit-text-stroke-color: rgba(0,0,0,0.2);

          &:before{
            content: attr(data-text);
            filter: url(#bevel) url(#innerGlow);
            background: linear-gradient(
              #ffffff 0% 35%,
              var(--theme-primary-b) 35%,
              var(--theme-primary-a) 59%,
              var(--theme-primary-b) 80%, 
              #ffffff 100%
            ) 0% 0% repeat;
            -webkit-background-clip:text;
            position: absolute;
            z-index:-1;
          }

          &:after{
            content: attr(data-text);
            position: absolute;
            transform:translate(-100%);
            z-index:-2;
          }

          &.header-ends {
            font-size: 120px;
            margin-top: -13px;
          }
        }
      }
    }

    .subheader {
      font-family: 'Horsemen';
      display: flex;
      justify-content: center;
      font-size: 30px;
      height: 30px;
      color: white;
      z-index: 2;
      color: var(--theme-secondary);
      -webkit-text-stroke: 1px $neonGlow;
      filter: drop-shadow(2px 2px 20px $neonGlow);
      margin-top: -10px;
    }
  }
</style>

<div class="title" style={`
  --theme-primary-a: ${primaryA};
  --theme-primary-b: ${primaryB};
  --theme-secondary: ${secondary};
  ${style}
`}>
  <div class="header-container-container">
    <div class="header-container">
      {#if header.length > 1}
        <div class="header header-ends" style="margin-right: 2px;" data-text={header.charAt(0)}>
          {header.charAt(0)}
        </div>
      {/if}
      <div class="header" data-text={header.substring(1, header.length - 1)}>
        {header.substring(1, header.length - 1)}
      </div>
      {#if header.length > 1}
        <div class="header header-ends" style="margin-left: 2px;" data-text={header.charAt(header.length - 1)}>
          {header.charAt(header.length - 1)}
        </div>
      {/if}
    </div>
    <svg>
      <defs>
        <filter id="bevel">
          <!-- filter stuff happening here -->
          <feMorphology operator="dilate" radius="3" in="SourceGraphic" result="bevel" />
        </filter>
        <filter id="noise" x="0vw" y="0vh" width="100vw" height="100vh">
          <feFlood flood-color="#808080" result="neutral-gray" />      
          <feTurbulence in="neutral-gray" type="fractalNoise" baseFrequency="0.8" numOctaves="10" stitchTiles="stitch" result="noise"/>
          <feColorMatrix in="noise" type="saturate" values="0" result="destaturatedNoise"></feColorMatrix>
          <feComponentTransfer in="desaturatedNoise" result="theNoise">
            <feFuncA type="table" tableValues="0 0 0.2 0"></feFuncA>
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="theNoise" mode="soft-light" result="noisy-image"/>      
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

