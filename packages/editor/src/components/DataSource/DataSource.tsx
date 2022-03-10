import React from 'react';
import {
  VStack,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  Accordion,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ComponentSchema } from '@sunmao-ui/core';
import { Api } from './Api';
import { State } from './State';
import { EditorServices } from '../../types';
import { ToolMenuTabs } from '../../services/enum';

export enum DataSourceType {
  API = 'API',
  STATE = 'State',
  LOCALSTORAGE = 'LocalStorage',
}

interface Props {
  active: string;
  services: EditorServices;
}

const DATASOURCE_TYPES = [
  DataSourceType.API,
  DataSourceType.STATE,
  DataSourceType.LOCALSTORAGE,
];

export const DataSource: React.FC<Props> = props => {
  const { active, services } = props;
  const { editorStore } = services;
  const { apis, states, localStorages } = editorStore.dataSources;
  const onMenuItemClick = (type: DataSourceType) => {
    editorStore.createDataSource(type);
    editorStore.setSelectedComponentId('');
  };
  const onApiItemClick = (api: ComponentSchema) => {
    editorStore.setActiveDataSource(api);
    editorStore.setActiveDataSourceType(DataSourceType.API);
    editorStore.setSelectedComponentId('');
  };
  const onStateItemClick = (state: ComponentSchema) => {
    editorStore.setActiveDataSource(state);
    editorStore.setActiveDataSourceType(DataSourceType.STATE);
    editorStore.setToolMenuTab(ToolMenuTabs.INSPECT);
    editorStore.setSelectedComponentId('');
  };
  const onLocalStorageItemClick = (state: ComponentSchema) => {
    editorStore.setActiveDataSource(state);
    editorStore.setActiveDataSourceType(DataSourceType.LOCALSTORAGE);
    editorStore.setToolMenuTab(ToolMenuTabs.INSPECT);
    editorStore.setSelectedComponentId('');
  };
  const onApiItemRemove = (api: ComponentSchema) => {
    editorStore.removeDataSource(api);
  };
  const onStateItemRemove = (state: ComponentSchema) => {
    editorStore.removeDataSource(state);
  };
  const MenuItems = () => (
    <>
      {DATASOURCE_TYPES.map(type => (
        <MenuItem key={type} onClick={() => onMenuItemClick(type)}>
          {type}
        </MenuItem>
      ))}
    </>
  );

  return (
    <VStack spacing="2" alignItems="stretch">
      <Flex padding="4" paddingBottom="0">
        <Text fontSize="lg" fontWeight="bold">
          DataSource
        </Text>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="add event"
            size="sm"
            variant="ghost"
            colorScheme="blue"
            icon={<AddIcon />}
            rightIcon={<ChevronDownIcon />}
          />
          <MenuList>
            <MenuItems />
          </MenuList>
        </Menu>
      </Flex>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <Api
          apis={apis}
          active={active}
          onItemClick={onApiItemClick}
          onItemRemove={onApiItemRemove}
        />
        <State
          title="State"
          filterPlaceholder="filter the states"
          emptyPlaceholder="No States."
          states={states}
          active={active}
          traitType="core/v1/state"
          onItemClick={onStateItemClick}
          onItemRemove={onStateItemRemove}
        />
        <State
          title="LocalStorage"
          traitType="core/v1/localStorage"
          filterPlaceholder="filter the localStorages"
          emptyPlaceholder="No LocalStorages."
          states={localStorages}
          active={active}
          onItemClick={onLocalStorageItemClick}
          onItemRemove={onStateItemRemove}
        />
      </Accordion>
    </VStack>
  );
};
