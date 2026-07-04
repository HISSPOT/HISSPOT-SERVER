export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Hisspot API',
    version: '1.0.0',
    description: '조선 왕 GPS 기반 수집 & 역사 여행 루트 추천 서비스',
  },
  servers: [{ url: '/api/v1', description: 'v1' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          nickname: { type: 'string' },
          profileImageUrl: { type: 'string', nullable: true },
          isOnboarded: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      King: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          orderNumber: { type: 'integer' },
          shortDescription: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          imageUrl: { type: 'string', nullable: true },
          tags: { type: 'array', items: { type: 'string' } },
          isCollected: { type: 'boolean' },
        },
      },
      Spot: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          contentId: { type: 'string', nullable: true },
          name: { type: 'string' },
          areaCode: { type: 'integer', nullable: true },
          sigunguCode: { type: 'integer', nullable: true },
          address: { type: 'string', nullable: true },
          latitude: { type: 'number', nullable: true },
          longitude: { type: 'number', nullable: true },
          imageUrl: { type: 'string', nullable: true },
          openingHours: { type: 'string', nullable: true },
          closedDays: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          tags: { type: 'array', items: { type: 'string' }, example: ['조선시대', '궁궐', '유네스코', '서울'] },
        },
      },
      SpotMapMarker: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          latitude: { type: 'number', nullable: true },
          longitude: { type: 'number', nullable: true },
          kingId: { type: 'integer' },
          isCollected: { type: 'boolean' },
        },
      },
      NearbySpot: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          address: { type: 'string', nullable: true },
          imageUrl: { type: 'string', nullable: true },
        },
      },
      Route: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          kingId: { type: 'integer' },
          name: { type: 'string' },
          tag: { type: 'string', nullable: true },
          estimatedMinutes: { type: 'integer', nullable: true },
          spots: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                orderNumber: { type: 'integer' },
                spot: { $ref: '#/components/schemas/Spot' },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/kakao': {
      post: {
        tags: ['Auth'],
        summary: '카카오 로그인',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['kakaoAccessToken'],
                properties: {
                  kakaoAccessToken: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '로그인 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        accessToken: { type: 'string' },
                        isOnboarded: { type: 'boolean' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'kakaoAccessToken 누락', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '카카오 토큰이 유효하지 않음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: '로그아웃',
        responses: {
          200: { description: '로그아웃 성공' },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/auth/dev-login': {
      post: {
        tags: ['Auth'],
        summary: '개발용 임시 로그인',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['userId'],
                properties: {
                  userId: { type: 'string', example: 'test-user-001' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '로그인 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        accessToken: { type: 'string' },
                        isOnboarded: { type: 'boolean' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/nickname/check': {
      get: {
        tags: ['Users'],
        summary: '닉네임 중복 체크',
        security: [],
        parameters: [
          { in: 'query', name: 'nickname', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: '중복 여부',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: { isDuplicate: { type: 'boolean' } },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'nickname 누락', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/users/onboarding': {
      post: {
        tags: ['Users'],
        summary: '온보딩 설정',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nickname'],
                properties: {
                  nickname: { type: 'string' },
                  profileImageUrl: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: '온보딩 완료', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/User' } } } } } },
          400: { description: 'nickname 누락', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          409: { description: '이미 사용 중인 닉네임', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/users/me': {
      get: {
        tags: ['Users'],
        summary: '내 프로필 조회',
        responses: {
          200: { description: '프로필 조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/User' } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '사용자를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      patch: {
        tags: ['Users'],
        summary: '내 프로필 수정',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nickname: { type: 'string' },
                  profileImageUrl: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: '수정 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/User' } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/kings': {
      get: {
        tags: ['Kings'],
        summary: '왕 목록 조회',
        responses: {
          200: {
            description: '조회 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        kings: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              name: { type: 'string' },
                              orderNumber: { type: 'integer' },
                              imageUrl: { type: 'string' },
                              isCollected: { type: 'boolean', description: '내 수집 여부' },
                            },
                          },
                        },
                        collectionRate: { type: 'number', description: '수집률 (0~100)', example: 11 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          500: { description: '서버 내부 오류', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/kings/{kingId}': {
      get: {
        tags: ['Kings'],
        summary: '왕 상세 조회',
        parameters: [
          { in: 'path', name: 'kingId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/King' } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '왕을 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          500: { description: '서버 내부 오류', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/collections/{kingId}': {
      post: {
        tags: ['Collections'],
        summary: '왕 수집하기',
        parameters: [
          { in: 'path', name: 'kingId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          201: {
            description: '수집 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        collectedAt: { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '왕을 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          409: { description: '이미 수집한 왕', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/spots': {
      get: {
        tags: ['Spots'],
        summary: '왕 수집 장소 전체 조회 (지도 마커용, 왕당 연결된 스팟 전부)',
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/SpotMapMarker' } } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/spots/{kingId}': {
      get: {
        tags: ['Spots'],
        summary: '특정 왕의 수집 장소 조회',
        parameters: [
          { in: 'path', name: 'kingId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/Spot' } } } } } } },
          400: { description: 'kingId 누락/유효하지 않음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/spots/{spotId}/nearby': {
      get: {
        tags: ['Spots'],
        summary: '주변 관광지 조회 (한국관광공사 API 실시간)',
        parameters: [
          { in: 'path', name: 'spotId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/NearbySpot' } } } } } } },
          400: { description: '해당 장소에 좌표 정보가 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '장소를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/spots/{spotId}/check-distance': {
      post: {
        tags: ['Spots'],
        summary: '수집 가능 거리 체크',
        parameters: [
          { in: 'path', name: 'spotId', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['latitude', 'longitude'],
                properties: {
                  latitude: { type: 'number' },
                  longitude: { type: 'number' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '거리 체크 결과',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        isCollectable: { type: 'boolean' },
                        distance: { type: 'number', description: '거리 (km)' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: '좌표 정보 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '장소를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/routes': {
      get: {
        tags: ['Routes'],
        summary: '왕별 추천 루트 목록 조회',
        parameters: [
          { in: 'query', name: 'kingId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/Route' } } } } } } },
          400: { description: 'kingId 누락', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/routes/me': {
      get: {
        tags: ['Routes'],
        summary: '저장한 루트 목록 조회',
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/Route' } } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/routes/me/{routeId}': {
      post: {
        tags: ['Routes'],
        summary: '루트 저장',
        parameters: [
          { in: 'path', name: 'routeId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          201: { description: '저장 성공' },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '루트를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          409: { description: '이미 저장한 루트', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Routes'],
        summary: '루트 저장 취소',
        parameters: [
          { in: 'path', name: 'routeId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '취소 성공' },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '저장된 루트를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/routes/{routeId}': {
      get: {
        tags: ['Routes'],
        summary: '루트 상세 조회',
        parameters: [
          { in: 'path', name: 'routeId', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: '조회 성공', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/Route' } } } } } },
          401: { description: '인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          404: { description: '루트를 찾을 수 없음', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
  },
};
