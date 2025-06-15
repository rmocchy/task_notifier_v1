# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**googleAuthUri**](#googleauthuri) | **GET** /auth/google/url | |
|[**tokenExchange**](#tokenexchange) | **POST** /auth/google/token | |

# **googleAuthUri**
> GoogleAuthUri200Response googleAuthUri()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.googleAuthUri();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GoogleAuthUri200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 認証URLを取得 |  -  |
|**500** | 内部サーバーエラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tokenExchange**
> TokenExchange200Response tokenExchange()


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    TokenExchangeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let tokenExchangeRequest: TokenExchangeRequest; // (optional)

const { status, data } = await apiInstance.tokenExchange(
    tokenExchangeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tokenExchangeRequest** | **TokenExchangeRequest**|  | |


### Return type

**TokenExchange200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 認証コードからトークンを取得 |  -  |
|**500** | 内部サーバーエラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

