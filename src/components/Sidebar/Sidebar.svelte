<script lang="ts">
  import type { SidebarItem, SidebarTitle } from './index';
  import {
    Panel,
    View,
    Page,
    PageContent,
    List,
    ListItem,
  } from 'framework7-svelte';

  import './Sidebar.scss';

  import SidebarToggle from './SideBarToggle.svelte';
  import SmallTitle from '../Title/SmallTitle.svelte';

  export let items: (SidebarItem | SidebarTitle)[] = [];

  let width = window.innerWidth;
  let opened = false;

  $: mobile = width < 780;
  $: opened = !mobile;
  
  let ref: Panel;

</script>

<svelte:window bind:innerWidth={width} />

<SidebarToggle />

{#key mobile}
  <Panel
    class="ui-sidebar"
    backdrop={mobile}
    left
    opened={(() => {
      if (!mobile) return opened;
      return false;
    })()}
    reveal={!mobile}
    cover={mobile}
    bind:this={ref}
  >
    <View>
      <Page pageContent={false}>
        <PageContent>
          <div style="margin-left: 75px">
            <SmallTitle />
          </div>
          <slot name="root" />
          <div class="ui-sidebar-content">
            {#each items as item}
              {#if 'color' in item}
                <List noChevron noHairlines noHairlinesBetween>
                  <ListItem
                    class={`color-${item.color}`}
                    tabLink
                    link
                    tabLinkActive={item.active}
                    title={item.title}
                    on:click={() => item.onClick && item.onClick()}
                  />
                </List>
              {:else}
                <h6>{item.title}</h6>
              {/if}
            {/each}
            <slot />
          </div>
          <div class="ui-sidebar-footer">
            <slot name="footer" />
          </div>
        </PageContent>
      </Page>
    </View>
  </Panel>
{/key}