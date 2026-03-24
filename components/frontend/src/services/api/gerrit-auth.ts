import { apiClient } from './client'

export type GerritAuthMethod = 'http_basic' | 'git_cookies'

export type GerritConnectRequest = {
  instanceName: string
  url: string
  authMethod: GerritAuthMethod
  username?: string
  httpToken?: string
  gitcookiesContent?: string
}

export type GerritTestRequest = {
  url: string
  authMethod: GerritAuthMethod
  username?: string
  httpToken?: string
  gitcookiesContent?: string
}

export type GerritTestResponse = {
  valid: boolean
  message?: string
  error?: string
}

export type GerritInstanceStatus = {
  connected: boolean
  instanceName: string
  url: string
  authMethod: GerritAuthMethod
  updatedAt: string
}

export type GerritInstancesResponse = {
  instances: GerritInstanceStatus[]
}

export async function connectGerrit(data: GerritConnectRequest): Promise<void> {
  await apiClient.post<void, GerritConnectRequest>('/auth/gerrit/connect', data)
}

export async function testGerritConnection(data: GerritTestRequest): Promise<GerritTestResponse> {
  return apiClient.post<GerritTestResponse, GerritTestRequest>('/auth/gerrit/test', data)
}

export async function getGerritInstances(): Promise<GerritInstancesResponse> {
  return apiClient.get<GerritInstancesResponse>('/auth/gerrit/instances')
}

export async function getGerritInstanceStatus(instanceName: string): Promise<GerritInstanceStatus> {
  return apiClient.get<GerritInstanceStatus>(`/auth/gerrit/${instanceName}/status`)
}

export async function disconnectGerrit(instanceName: string): Promise<void> {
  await apiClient.delete<void>(`/auth/gerrit/${instanceName}/disconnect`)
}
