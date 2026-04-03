#ifndef __ARCH_CC_H__
#define __ARCH_CC_H__

#include <stdint.h>
#include <stdio.h>

// Define basic types
typedef uint8_t u8_t;
typedef int8_t s8_t;
typedef uint16_t u16_t;
typedef int16_t s16_t;
typedef uint32_t u32_t;
typedef int32_t s32_t;
typedef uintptr_t mem_ptr_t;

#define LWIP_PLATFORM_DIAG(x)   do {printf x;} while(0)
#define LWIP_PLATFORM_ASSERT(x) do {printf("Assert: %s\n", x); while(1);} while(0)

#define SYS_ARCH_DECL_PROTECT(level)
#define SYS_ARCH_PROTECT(level)
#define SYS_ARCH_UNPROTECT(level)

#endif /* __ARCH_CC_H__ */
